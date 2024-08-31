  import { AllUsers } from "../_db.js";
  export const typeDefs = `#graphql 
      type User  {
          id: ID!,
          email: String, 
          password: String
  
      }
  
      input UserInput {
      email: String!,
      password: String!
      }
  
      type Mutation {
          addUser(input: UserInput!): User
      }
  `;

export const resolvers = {
  Mutation: {
    addUser: (_, { input }) => {
      AllUsers.push(input);
      let user = AllUsers;
      console.log(user);
      return AllUsers;
    },
  },
};
