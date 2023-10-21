import  { 
    DynamoDBClient, 
    GetItemCommand, 
    ScanCommand, 
    TransactWriteItemsCommand,
    BatchWriteItemCommand
} from "@aws-sdk/client-dynamodb";

const dynamodbClient = new DynamoDBClient();

class DBClient {
    constructor() {
        this.client = dynamodbClient
    }

    sendCommand (command) {
        return this.client.send(command)
    }

    getScanCommand (config) {
        return new ScanCommand(config) 
    }

    getGetItemCommand (config) {
        return new GetItemCommand(config)
    }

    getTransactionWriteCommand (config) {
        return new TransactWriteItemsCommand(config)
    }

    getBatchWriteItemCommand (config) {
        return new BatchWriteItemCommand(config)
    }
}

const instance = new DBClient()

export {
    DBClient,
    instance as DBClientInstance
}