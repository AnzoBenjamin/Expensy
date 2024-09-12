import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";
import userGoalsAndLimitsResolver from "./userGoalsAndLimits.resolver.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver, userGoalsAndLimitsResolver]);

export default mergedResolvers;
