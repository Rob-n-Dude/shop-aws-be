import { 
    GetObjectCommand, 
    S3Client, 
    CopyObjectCommand, 
    DeleteObjectCommand
} from "@aws-sdk/client-s3"
import csv from 'csv-parser'
import { uploadFolder } from "./importProductsFile"
import {
    SQSClient,
    SendMessageCommand,
    GetQueueUrlCommand
} from '@aws-sdk/client-sqs'

const parser = csv({
    separator: ',',
})

const s3Client = new S3Client({region: 'eu-west-1'})
const sqsClient = new SQSClient({region: 'eu-west-1'})

const importFileParser = async (event) => {
    console.log('event', event)

    const {
        bucket: { 
            name: bucketName 
        },
        object: {
            key
        }
    } = event.Records[0].s3

    const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    })

    try{
        console.log('Receiving reading stream from S3')
        const stream = await s3Client.send(getCommand)
        const queueName = "CatalogItemsQueue";
        const { QueueUrl } = await sqsClient.send(new GetQueueUrlCommand({
            QueueName: process.env.SQS_NAME,
        }))        

        parser.on('data', (data) => {
            sqsClient.send(
                new SendMessageCommand({
                    QueueUrl: QueueUrl,
                    MessageBody: JSON.stringify(data),
                }),
                () => {
                    console.log(`Message Sent, data:${JSON.stringify(data)}, to ${process.env.SQS_NAME}`)
                }
            )
        })
        
        console.log('Stream Received')
        stream.Body.pipe(parser)
    } catch (e) {
        console.log('An Error occurs: ', e)
    }

    try {
        const copyCommand = new CopyObjectCommand({
            Bucket: bucketName,
            CopySource: bucketName + '/' + key,
            Key: key.replace(uploadFolder, 'parsed/')
        })

        console.log(`Attempt to copy ${key}, file`)

        await s3Client.send(copyCommand)
        
        console.log(`${key} file copied`)

        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key
        })

        console.log(`Attempt to delete ${key}, file from /uploaded`)

        await s3Client.send(deleteCommand)

        console.log(`${key} file deleted`)
    } catch (e) {
        console.log('Something went wrong', e)
    }
}

export {
    importFileParser
}