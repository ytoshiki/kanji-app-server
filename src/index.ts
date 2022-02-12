require('dotenv').config();
import { ApolloServer } from "apollo-server"
import { typeDefs } from "./schema";
import mongoose from  'mongoose';
import { Mutation } from "./resolvers/mutations";
import { getUserFromToken } from "./utils/getUserFromToken";
import { Query } from "./resolvers";

export interface Context {
  userInfo: {
    id: number;
  } | null;
}

const startServer = async () => {


  const resolvers = {
    Query,
    Mutation 
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}): Promise<Context> => {
      const token = req.headers.authorization;
      if (!token) {
        return {
          userInfo: null
        }
      }

      const userInfo = await getUserFromToken(token as string);
      return {
        userInfo
      }
    }
  })


  const dbUrl = process.env.DB_CONN;

  if (!dbUrl) {
    throw new Error("DB connection is mandatory");
  }
  await mongoose.connect(dbUrl);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('MongoDB Connected');
  });

  server.listen().then(({url}:{url: string}) => {
    console.log("Server is ready at " + url)
  })

}

startServer();