import { AllUsers } from "../_db.js";

export const typeDefs = `#graphql 
    type User  {
        id: ID!,
        email: String, 
        password: String

    }

    type Query {
    _: Boolean
    }
    
    input UserInput {
    email: String!,
    password: String!
    }

    type Mutation {
        authenticateUser(input: UserInput!): User
    }
`;

export const resolvers = {
  Mutation: {
    authenticateUser: (_, { input }) => {
      const user = AllUsers.find(
        (user) => user.email === input.email && user.password === input.password
      );
      return user || null;
    },
  },
};
