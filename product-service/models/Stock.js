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
        return Object.entries(stock).every(([key, value]) => (
            Object.values(STOCK_FIELD).includes(key) &&
            typeof value === STOCK_FIELD_TYPE[key]
        ))
    }
}

export {
    Stock
}