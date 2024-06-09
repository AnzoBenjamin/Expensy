const path = require("path");
const { mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");


const mergedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolver.js"));
//const mergedResolvers = mergeResolvers(resolversArray);

module.exports = mergedResolvers;
