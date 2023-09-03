import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './_db.js';


const resolvers = {
  Query:{
    games : ()=> db.games,
    reviews : ()=> db.reviews,
    authors : () => db.authors,
    game :(parent,args) => db.games.find(game=>game?.id === args?.id),
    review :(parent,args) => db.reviews.find(review=>review?.id === args?.id),
    author :(parent,args) => db.authors.find(author=>author?.id === args?.id)
  },
  Game:{
    //ekhane within reviews parent is a single game
    reviews :(parent) => db?.reviews?.filter(review => review?.game_id === parent?.id)
  },
  Review:{
    //ekhane within author parent is a single review
      author:(parent) => db?.authors?.find(author=>author?.id === parent.author_id),
      game:(parent) => db?.games?.find(game=>game?.id === parent?.game_id),
    },
    Author:{
      //ekhane within review parent is a single author
      reviews :(parent) => db?.reviews?.filter(review => review?.author_id === parent?.id)
    },

}

const server = new ApolloServer({
  typeDefs ,
  resolvers
})



const {url} = await startStandaloneServer(server,{listen:{port:4000}})

console.log(`Server is running at ${url}`)