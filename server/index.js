import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"

const typeDefs= `#graphql

    #by default eta hoye jay coz apolloserver e query bole amra jeta likhi seta Query ke refer kore
    schema{
        query:Query
    }

    type Query{
        greeting:String
    }
`

const resolvers = { 
    Query:{
        greeting: () => "Hello World"
    }
}
    


const server = new ApolloServer({typeDefs:typeDefs,resolvers:resolvers})
const info = await startStandaloneServer(server,{listen:{port:4000}})
console.log(`Server running at ${info.url}`)