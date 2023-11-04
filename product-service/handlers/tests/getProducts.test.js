import { getProducts } from "../getProducts.js"
import { dbConnector } from "../../db/DBConnector.js"
import { applyHeaders } from "../../helpers/applyHeaders.js"

const mockData = [
    {id: 1, price: 10}
]

describe('handler: getProducts', () => {
    const getAll = jest.spyOn(dbConnector, 'getAll').mockImplementation(() => Promise.resolve(mockData))

    it('should return correct data', async () => {
        const data = await getProducts()

        const expectedData = applyHeaders({
            statusCode: 200,
            body: JSON.stringify(mockData)
        })

        expect(getAll).toHaveBeenCalled()
        expect(data).toEqual(expectedData)
        
    })
})