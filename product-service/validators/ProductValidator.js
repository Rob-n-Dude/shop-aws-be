import { Product } from "../models/Product.js"
import { Stock } from "../models/Stock.js"

class ProductValidator {
    static isValid (productData) {
        console.log('validating data', productData)
        const product = new Product(productData)
        const stock = new Stock(productData)

        return (
            Product.isValid(product) &&
            Stock.isValid(stock)
        )
    }
}

export {
    ProductValidator
}