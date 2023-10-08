import path from 'path'
import fs from 'fs'

const root = fs.realpathSync(process.cwd())
const handlers = path.resolve(root, 'handlers')

const config = {
  rootDir: root,
  roots: [
    handlers
  ],
    transform: {
    "^.+\\.js?$": "esbuild-jest"
  },
  testMatch: [
    "<rootDir>/**/*.(test).js",
  ],

}

export default config
