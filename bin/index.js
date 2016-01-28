const argv = require("yargs").argv
const main = require("../src/index.js")
const q = argv._[0]

main(q)
