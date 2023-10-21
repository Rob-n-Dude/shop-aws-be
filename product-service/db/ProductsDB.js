import { DB } from "./DB.js";

export const PRODUCTS_TABLE = 'ProductsTable';

class ProductsDB extends DB {
    constructor() {
        super({
            TableName: PRODUCTS_TABLE
        })
    }

    getAll () {
        return super._getAll()
    }

    getById (id) {
        return super._getByKey({
            id
        })
    }
}

const instance = new ProductsDB()

instance.toString = () => PRODUCTS_TABLE

export {
    instance as productsDB
}