const userGoalsAndLimitsTypeDef = `#graphql
    type Query{
        userGoalsAndLimits: UserGoalsAndLimits
    }
  type UserGoalsAndLimits {
    userId: ID!
    goals: CategoryGoals
    limits: CategoryLimits
  }

  type CategoryGoals {
    saving: Float
    expense: Float
    investment: Float
  }

  type CategoryLimits {
    saving: Float
    expense: Float
    investment: Float
  }

  type Mutation {
    setUserGoalsAndLimits(input: SetUserGoalsAndLimitsInput!): UserGoalsAndLimits!
    updateUserGoalsAndLimits(input: UpdateUserGoalsAndLimitsInput!): UserGoalsAndLimits!
  }

  input SetUserGoalsAndLimitsInput {
    goals: SetCategoryGoalsInput!
    limits: SetCategoryLimitsInput!
  }

  input SetCategoryGoalsInput {
    saving: Float
    expense: Float
    investment: Float
  }

  input SetCategoryLimitsInput {
    saving: Float
    expense: Float
    investment: Float
  }

  input UpdateUserGoalsAndLimitsInput {
    goals: UpdateCategoryGoalsInput
    limits: UpdateCategoryLimitsInput
  }

  input UpdateCategoryGoalsInput {
    saving: Float
    expense: Float
    investment: Float
  }

  input UpdateCategoryLimitsInput {
    saving: Float
    expense: Float
    investment: Float
  }
`;

export default userGoalsAndLimitsTypeDef;
