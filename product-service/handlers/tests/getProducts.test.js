import { getProducts } from "../getProducts.js"

jest.mock('../../helpers.js', () => ({
    getMockData: jest.fn(() => Promise.resolve([]))
}))

describe('handler: getProducts', () => {
    it('should return correct data', async () => {
        const data = await getProducts()

        const expectedData = {
            statusCode: 200,
            body: JSON.stringify([])
        }

        expect(data).toEqual(expectedData)
        
    })
})