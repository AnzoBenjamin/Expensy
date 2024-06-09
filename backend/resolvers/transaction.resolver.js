const { transactions } = require("../dummyData/data");
const { Query, Mutation } = require("./user.resolver");

module.exports = {
    Query:{
        transactions:()=>{
            return transactions
        }
    },
    Mutation:{}
}