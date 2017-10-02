import util from 'util'
import fs from 'fs'

const { promisify } = util

const readFilePromise = fileName => promisify(fs.readFile)(fileName, {encoding: 'utf8'})

export default readFilePromise