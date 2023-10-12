import fs from 'fs' 
import path from 'path'

const root = fs.realpathSync(process.cwd())
const dataFolder = path.resolve(root, 'mockData')

const DATA_PATH = `${dataFolder}/data.json`

const getMockData = () => new Promise((resolve, reject) => {
    fs.readFile(DATA_PATH, (err, data) => {
        if (err) {
            reject(err)
        }

        resolve(JSON.parse(data))
    })
})

export {
    getMockData
}