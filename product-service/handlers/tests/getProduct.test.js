import { getProduct } from "../getProduct.js"

const mockData = [
    {id: 1, price: 10},
    {id: 2, price: 12},
]

jest.mock('../../helpers.js', () => ({
    getMockData: jest.fn(() => Promise.resolve(mockData))
}))

const mockEvent = {
    pathParameters: {
        productId: 1
    }
}

describe('handler: getProduct', () => {
    it('should return correct data', async () => {
        const data = await getProduct(mockEvent)

        const expectedData = {
            statusCode: 200,
            body: JSON.stringify(mockData[0])
        }

        expect(data).toEqual(expectedData)
        
    })

    it('should return correct data if nothing was found', async () => {
        mockEvent.pathParameters.productId = 3

        const data = await getProduct(mockEvent)

        const expectedData = {
            statusCode: 404,
            body: 'Not Found'
        }

        expect(data).toEqual(expectedData)
        
    })
})