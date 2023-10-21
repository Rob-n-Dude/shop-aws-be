import { marshall } from '@aws-sdk/util-dynamodb';
import fs from 'fs';
import { PRODUCTS_TABLE } from '../db/ProductsDB.js';
import { STOCKS_TABLE } from '../db/StockDB.js';
import { DBClientInstance } from '../db/DBClient.js';

async function loadFixtures(jsonData, tableName) {
  try {
    const fixtureItems = jsonData.map((item) => {
      const itemData = marshall(item);
      return { PutRequest: { Item: itemData } };
    });


    console.log(`Loading fixtures for ${tableName}`)
    const params = { RequestItems: { [tableName]: fixtureItems }};
    const batchWriteItemCommand = DBClientInstance.getBatchWriteItemCommand(params)
    await DBClientInstance.sendCommand(batchWriteItemCommand);
    console.log(`Fixtures for ${tableName} are loaded`)

  } catch (err) {
    console.error(`Failed to load fixtures for ${tableName}: ${err}`);
  }
}

const deleteTableData = async (TableName, primaryKey) => {
  try {
    console.log('Deleting table data from: ', TableName)
    const { Items: items } = await DBClientInstance.sendCommand(DBClientInstance.getScanCommand({ TableName }));

    const chunks = []; 
    while (items.length) chunks.push(items.splice(0, 25));

    for (let chunk of chunks) {
      const params = {
        RequestItems: {
          [TableName]: chunk.map(item => ({
            DeleteRequest: {
              Key: {
                [primaryKey]: item[primaryKey]
              }
            },
          })),
        },
      };
      await DBClientInstance.sendCommand(DBClientInstance.getBatchWriteItemCommand(params));
    }

    console.log('Data from table ', TableName, ' deleted')
  } catch (e) {
    console.warn('Failed to delete data from table: ', TableName)
  }
}

const productsJsonData = JSON.parse(fs.readFileSync('./fixtures/products.json', 'utf-8'));
const stocksJsonData = JSON.parse(fs.readFileSync('./fixtures/stocks.json', 'utf-8'));

const clearTablesAndLoadFixtures = async () => {
  await Promise.all([
    deleteTableData(PRODUCTS_TABLE, 'id'),
    deleteTableData(STOCKS_TABLE, 'productId'),
  ])
  await Promise.all([
    loadFixtures(productsJsonData, PRODUCTS_TABLE),
    loadFixtures(stocksJsonData, STOCKS_TABLE),
  ])
}

clearTablesAndLoadFixtures()
