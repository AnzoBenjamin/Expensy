const userTypeDef = `#graphql
type Query {
  authUser: User
  user(userId: ID!): User
}

type Mutation {
  signUp(input: SignUpInput!): User
  login(input: LoginInput!): User
  logout: LogoutResponse
}

type User {
  _id: ID!
  username: String!
  name: String!
  password: String!
  profilePicture: String!
  gender: String!
}

type LogoutResponse{
    message: String!
}

input SignUpInput {
  username: String!
  name: String!
  password: String!
  gender: String!
}

input LoginInput {
  username: String!
  password: String!
}
`;

export default userTypeDef;