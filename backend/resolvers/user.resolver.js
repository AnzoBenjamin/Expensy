const { users, transactions } = require("../dummyData/data");
module.exports = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, {userId})=>{
      return users.find((user)=>userId===user._id)
    }
  },

  Mutation: {
    signUp: (_, args)=>{
        return users.push(args)
    }
  }
};
