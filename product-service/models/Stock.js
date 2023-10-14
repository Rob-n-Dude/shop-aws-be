const STOCK_FIELD = {
    COUNT: 'count',

}

const STOCK_FIELD_TYPE = {
    [STOCK_FIELD.COUNT]: 'number',
}

class Stock {
    constructor (productData) {
        this.count = productData.count
        productData.id && (this.productId = productData.id)
    }

    static isValid (stock) {
        console.log('validating Stock data:', stock)
        return (
            STOCK_FIELD.COUNT in stock &&
            typeof stock[STOCK_FIELD.COUNT] === STOCK_FIELD_TYPE[STOCK_FIELD.COUNT]
        )
    }
}

export {
    Stock
}