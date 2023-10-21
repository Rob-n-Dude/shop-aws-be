import { applyHeaders } from "../helpers"
import { dbConnector } from "../db/DBConnector"

const getProduct = async (event) => {
    const { productId } = event.pathParameters

    console.log('Receive get product request, productId:', productId)

    const productData = await dbConnector.getById(productId)

    if (!productData) {
        return applyHeaders({
            statusCode: 404,
            body: 'Not Found',
        }) 
    }

    return applyHeaders({
        statusCode: 200,
        body: JSON.stringify(productData),
    })
}

export {
    getProduct
}