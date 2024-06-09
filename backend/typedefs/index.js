const path = require("path");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

const mergedTypeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"))
//const mergedTypeDefs =  mergeTypeDefs(typesArray)

module.exports = mergedTypeDefs