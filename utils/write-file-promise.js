import util from 'util'
import fs from 'fs'

const { promisify } = util

const writeFilePromise = (fileName, data) => promisify(fs.writeFile)(fileName, data)

export default writeFilePromise