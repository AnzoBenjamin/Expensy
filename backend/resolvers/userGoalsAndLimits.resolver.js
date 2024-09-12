import UserGoalsAndLimits from "../models/userGoalsAndLimits.model.js";

const userGoalsAndLimitsResolver = {
    Query: {
        userGoalsAndLimits: async (_, __, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;

                const userGoalsAndLimits = await UserGoalsAndLimits.findOne({ userId });
                if (!userGoalsAndLimits) {
                    throw new Error("User goals and limits not found");
                }

                return userGoalsAndLimits;
            } catch (err) {
                console.error("Error getting user goals and limits:", err);
                throw new Error("Error getting user goals and limits");
            }
        },
    },
    Mutation: {
        updateUserGoalsAndLimits: async (_, { input }, context) => {
            try {
                if (!context.getUser()) throw new Error("Unauthorized");
                const userId = await context.getUser()._id;

                const userGoalsAndLimits = await UserGoalsAndLimits.findOneAndUpdate(
                    { userId },
                    input,
                    { new: true, upsert: true }
                );

                return userGoalsAndLimits;
            } catch (err) {
                console.error("Error updating user goals and limits:", err);
                throw new Error("Error updating user goals and limits");
            }
        },
    }
}

export default userGoalsAndLimitsResolver