import { AllUsers } from "../_db.js";
import Users from "../models/user.js";
import bcrypt from "bcrypt";

export const typeDefs = `#graphql 
      type User  {
          id: ID!,
          email: String, 
          password: String
  
      }
  
      input UserInput {
      name: String,
      email: String!,
      password: String!
      }
  
      type Mutation {
          addUser(input: UserInput!): User
      }
  `;

export const resolvers = {
  Mutation: {
    addUser: async (_, { input }) => {
      const { email, password, name } = input;

      // Check if user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) throw new Error('User already exists');

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save the new user
      const user = new Users({
        email,
        password: hashedPassword,
        name
      });
      await user.save();

      return user;
    },
}
}
