import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { applyHeaders } from '../helpers/applyHeaders'


export const S3BucketName = 'egor-semenov-import-service-bucket'
export const uploadFolder = 'uploaded/'

const importProductsFile = async (event) => {
    
    const fileName = event.queryStringParameters.name
    
    const signedUrlKey = uploadFolder + fileName
    
    const putCommand = new PutObjectCommand({
        Bucket: S3BucketName,
        Key: signedUrlKey
    })
    console.log('creating Signed Url with params:', putCommand)
    const s3Client = new S3Client({region: 'eu-west-1'})
    const url = await getSignedUrl(s3Client, putCommand, { expiresIn: 20 })

    return applyHeaders({
        statusCode: 200,
        body: url
    })
}

export {
    importProductsFile
}