import { getProduct } from "../getProduct.js"
import { dbConnector } from "../../db/DBConnector.js"
import { applyHeaders } from "../../helpers/applyHeaders.js"

const mockData = {id: 1, price: 10}

const mockEvent = {
    pathParameters: {
        productId: 1
    }
}

describe('handler: getProduct', () => {
    const getById = jest.spyOn(dbConnector, 'getById').mockImplementation(() => Promise.resolve(mockData))

    it('should return correct data', async () => {
        const data = await getProduct(mockEvent)

        const expectedData = applyHeaders({
            statusCode: 200,
            body: JSON.stringify(mockData)
        })

        expect(getById).toHaveBeenCalled()
        
        expect(data).toEqual(expectedData)
    })

    it('should return correct data if nothing was found', async () => {
        mockEvent.pathParameters.productId = 3
        getById.mockImplementationOnce(() => Promise.resolve())

        const data = await getProduct(mockEvent)

        const expectedData = applyHeaders({
            statusCode: 404,
            body: 'Not Found'
        })

        expect(data).toEqual(expectedData)
        
    })
})