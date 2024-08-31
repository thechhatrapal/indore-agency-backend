import mongoose from "mongoose";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";

import {
  typeDefs as signInDef,
  resolvers as signInResolver,
} from "./query/SigninSchema.js";
import {
  typeDefs as signUpDef,
  resolvers as signUpResolver,
} from "./query/SignupSchema.js";

import "dotenv/config";
mongoose
  .connect(
    `mongodb+srv://${process.env.name}:${process.env.password}@cluster0.3s98o.mongodb.net/?retryWrites=true&w=majority&appName=users`
  )
  .then((res) => console.log("db is connected"))
  .catch((err) => console.log(err));

const typeDefs = [signInDef, signUpDef];

// Combine multiple resolvers
const resolvers = [signInResolver, signUpResolver];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`server is running on ${url}`);
