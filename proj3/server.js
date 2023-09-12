import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {users,quotes} from "./_db.js"

const typeDefs = `#graphql

    type User {
        id:ID!
        firstName:String!
        lastName:String!
        email:String!
        password:String!
        quotes:[Quote!] # User e quotes er alada resolvers banate hobe
    }

    type Quote{
        name:String!
        by:ID!
        details:User!
    }

    type Query{
        greet:String
        users:[User]
        quotes:[Quote]
    }
`
const resolvers = {
    Query:{
        greet:()=> "Hello World",
        users:() => users,
        quotes:()=>quotes
    },
    User:{
        quotes:(user)=>quotes?.filter(quote=>quote?.by === user.id)
    },
    Quote:{
        details:(quote)=>users.find(user=>user?.id === quote.by)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server , {listen :{port : 4000}})
console.log(`Server is running at ${url}`)