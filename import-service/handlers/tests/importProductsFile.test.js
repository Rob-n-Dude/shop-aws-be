import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { applyHeaders } from '../../helpers/applyHeaders'
import { S3BucketName, uploadFolder, importProductsFile } from '../importProductsFile.js'
import { mockClient } from 'aws-sdk-client-mock'

const mockS3Client = mockClient(S3Client)

jest.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: jest.fn(() => Promise.resolve('url'))
}))

const mockName = 'mockName'

jest.mock('../importProductsFile', () => ({
    ...jest.requireActual('../importProductsFile.js'),
    S3BucketName: 'mockBucketName',
    uploadFolder: 'mockUploadFolder'
}))

const mockEvent = {
    queryStringParameters: {
        name: mockName
    }
}
describe('Handler: importProductsFile', () => {
   it('should return correct value', async () => {
        const result = await importProductsFile(mockEvent)

        expect(result).toEqual(
            applyHeaders({
                statusCode: 200,
                body: 'url'
            })
        )
   })
})