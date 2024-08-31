import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; // Ensure this import is included


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
    authenticateUser: async (_, { input }) => {
      const { email, password } = input;

      // Find the user by email
      const user = await Users.findOne({ email });
      if (!user) throw new Error('Invalid credentials');

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) throw new Error('Invalid credentials');

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: '1h' });
      return { ...user.toObject(), token }; // Ensure you're returning the token correctly
    
    },
  },
};
