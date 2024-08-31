import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs as signInDef, resolvers as signInResolver} from "./query/SigninSchema.js";
import { typeDefs as signUpDef, resolvers as signUpResolver} from "./query/SignupSchema.js";


const typeDefs = [
    signInDef,
    signUpDef
  ];
  
  // Combine multiple resolvers
  const resolvers = [
    signInResolver,
    signUpResolver
    
  ];

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

const server = new ApolloServer(({
    schema, 
}))


const { url } = await startStandaloneServer(server, {
    listen: {port : 4000 }
})

console.log(`server is running on ${url}`)