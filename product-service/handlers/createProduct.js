import { dbConnector } from "../db/DBConnector.js"
import { applyHeaders } from "../helpers"
import { ProductValidator } from "../validators/ProductValidator"

export const createProduct = async (event) => {
    const product = JSON.parse(event.body)
    console.log('Receive create product request, product:', product)

    if (!ProductValidator.isValid(product)) {
        console.log('Product has fail validation')
        return applyHeaders({
            statusCode: 400,
            body: JSON.stringify('Bad Request')
        })
    }

    try {
        await dbConnector.createItem(product)
        return applyHeaders({
            statusCode: 200,
            body: JSON.stringify('Created!')
        })
    } catch (e) {
        return applyHeaders({
                statusCode: 500,
                body: JSON.stringify('Internal Server Error') 
            })
    }
    
}
