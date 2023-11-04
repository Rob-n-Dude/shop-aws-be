import { dbConnector } from "../db/DBConnector"
import { ProductValidator } from "../validators/ProductValidator"
import {
    SNSClient,
    PublishCommand
} from '@aws-sdk/client-sns'

const snsClient = new SNSClient({
    region: 'eu-west-1'
})

const catalogBatchProcess = async (event) => {
    const data = event.Records.map(({body}) => JSON.parse(body))
    console.log('Receive create products request with data: ', data)

    const validProducts = data.filter((product) => ProductValidator.isValid(product))

    console.log(' validProducts,', validProducts)
    if (!validProducts.length) {
        console.log('No valid product data for creating')
        return
    }

    const createRequests = validProducts.map((product) => dbConnector.createItem(product))

    console.log('createRequests', createRequests)
    try {
        console.log(`Attempt to create ${createRequests.length} products`)
        await Promise.all(createRequests)
        console.log('Products are created')

        const snsPublishCommand = new PublishCommand({
            TopicArn: process.env.SNS_ARN,
            Message: `${createRequests.length} products are created`
        })

        await snsClient.send(snsPublishCommand)
    } catch (e) {
        console.log('Error occurs while creating products, e: ', e)
    }


}

export {
    catalogBatchProcess
}