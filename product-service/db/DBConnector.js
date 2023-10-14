import { marshall } from "@aws-sdk/util-dynamodb";
import { DBClient } from "./DBClient.js";
import { productsDB } from "./ProductsDB.js";
import { stocksDb } from "./StockDB.js";
import { v4 as uuid } from 'uuid'
import { Product } from "../models/Product.js";
import { Stock } from "../models/Stock.js";

class DBConnector extends DBClient {
    constructor() {
        super()
        this.stocksDb = stocksDb
        this.productsDb = productsDB
    }

    async getAll () {
        const [
            {value: products},
            {value: stocks}
        ] = await Promise.allSettled([
            this.productsDb.getAll(),
            this.stocksDb.getAll()
        ])

        const combinedData = products.map((product) => {
            const { count } = stocks.find((stock) => stock.productId === product.id)

            return {
                ...product,
                count
            }
        })

        return combinedData
    }

    async getById (id) {
        const [
            {value: product},
            {value: stock}
        ] = await Promise.allSettled([
            this.productsDb.getById(id),
            this.stocksDb.getByProductId(id)
        ])

        const combinedData = {
            ...product,
            count: stock.count
        }

        return combinedData
    }

    async createItem (data) {
        const id = uuid()

        data.id = id
        console.log('Attempt to create Product Item using transaction:', data)

        const productData = new Product(data)
        const stockData = new Stock(data)

        const transactionConfig = {
            TransactItems: [
                {
                  Put: {
                    TableName: String(this.productsDb),
                    Item: marshall({
                        ...productData
                    }),
                    ConditionExpression: 'attribute_not_exists(id)',
                  },
                },
                {
                  Put: {
                    TableName: String(this.stocksDb),
                    Item: marshall({
                        ...stockData
                    }),
                    ConditionExpression: 'attribute_not_exists(id)',
                  },
                },
              ],
        }

        const transactionCommand = super.getTransactionWriteCommand(transactionConfig)

        try {
            await super.sendCommand(transactionCommand)
            console.log('Transaction succeed')
        } catch (e) {
            console.warn('Transaction failed with error:', e)
            throw e
        }
    }
}

const instance = new DBConnector()

const fn = async (data) => {
    const mockData = {
        title: "title",
        description: "desc",
        price: 12,
        count: 1
    }
    await instance.createItem(mockData)
}

fn()
export { 
    instance as dbConnector
}
