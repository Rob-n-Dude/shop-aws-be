import {
    unmarshall,
    marshall
} from '@aws-sdk/util-dynamodb'
import { DBClient } from './DBClient.js'

class DB extends DBClient {
    constructor(defaultConfig) {
        super()
        this.config = {
            ...defaultConfig
        }
    }

    async _getAll () {
        const command = super.getScanCommand(this.config)
        
        const response = await super.sendCommand(command)
        const items = response.Items.map((item) => unmarshall(item))
        return items
    }

    async _getByKey (opts) {
        const command = super.getGetItemCommand({
            ...this.config,
            Key: marshall(opts)
        })

        const response = await super.sendCommand(command)
        return unmarshall(response.Item)
    }
}

export {
    DB
}