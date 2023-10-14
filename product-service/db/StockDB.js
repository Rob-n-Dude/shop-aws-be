import { DB } from "./DB.js"

export const STOCKS_TABLE = 'StockTable';

class StocksDB extends DB {
    constructor() {
        super({
            TableName: STOCKS_TABLE
        })
    }

    getAll () {
        return super._getAll()
    }

    getByProductId (productId) {
        return super._getByKey({
            productId
        })
    }
}

const instance = new StocksDB()

instance.toString = () => STOCKS_TABLE

export {
    instance as stocksDb
}