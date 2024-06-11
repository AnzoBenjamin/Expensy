const { users, transactions } = require("../dummyData/data");

const bcrypt = require("bcryptjs");
module.exports = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in login: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
      } catch (err) {
        console.error("Cannot find user: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !!name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bycrypt.genSalt(20);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture:
            gender === "male" ? boyProfilePicture : girlProfilePicture,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signup: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookies("connect.sid");

        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in login: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};
