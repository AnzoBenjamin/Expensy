import { gql} from "@apollo/client";

// GraphQL mutation to set user goals and limits
export const SET_USER_GOALS_AND_LIMITS = gql`
  mutation UpdateUserGoalsAndLimits($input: UpdateUserGoalsAndLimitsInput!) {
    updateUserGoalsAndLimits(input: $input) {
      goals {
        saving
        expense
        investment
      }
      limits {
        saving
        expense
        investment
      }
    }
  }
`;