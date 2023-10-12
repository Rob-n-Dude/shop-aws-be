import { applyHeaders, getMockData } from "../helpers"

const getProduct = async (event) => {
    const { productId } = event.pathParameters

    const data = await getMockData()
    const productData = data.find((d) => d.id === productId)

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