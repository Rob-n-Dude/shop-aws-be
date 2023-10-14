const PRODUCT_FIELD = {
    TITLE: 'title',
    DESCRIPTION: 'description',
    PRICE: 'price',
}

const PRODUCT_TYPE_FIELD = {
    [PRODUCT_FIELD.TITLE]: 'string',
    [PRODUCT_FIELD.DESCRIPTION]: 'string',
    [PRODUCT_FIELD.PRICE]: 'number',
}

class Product {
    constructor(productData) {
        productData.id && (this.id = productData.id)
        this.title = productData.title
        this.description = productData.description
        this.price = productData.price
    }

    static isValid (product) {
        console.log('validating Product data:', product)
        return Object.entries(product).every(([key, value]) => (
                Object.values(PRODUCT_FIELD).includes(key) &&
                typeof value === PRODUCT_TYPE_FIELD[key]
            )
        )
    }
}

export {
    Product
}