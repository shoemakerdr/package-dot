// enable @std/esm loader
require = require('@std/esm')(module, { cjs: true, esm: "js" })
module.exports = require('./src/package-dot.js').default