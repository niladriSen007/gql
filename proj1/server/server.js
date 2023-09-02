import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
    type Query {
        greeting : String
}`;

const resolvers = {
  Query: {
    greeting: () => "Hello Graphql",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const connection =  await startStandaloneServer(server, { listen: { port: 8000 } });
console.log(`Server running at ${connection.url}`)