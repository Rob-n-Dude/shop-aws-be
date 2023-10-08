import { getMockData } from "../helpers.js"

const getProduct = async (event) => {
    const { productId } = event.pathParameters

    const data = await getMockData()
    const productData = data.find((d) => d.id === productId)

    if (!productData) {
        return {
            statusCode: 404,
            body: 'Not Found',
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(productData)
    }
}

export {
    getProduct
}