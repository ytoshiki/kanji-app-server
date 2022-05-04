require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import mongoose, { ConnectOptions } from "mongoose";
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
    Mutation,
  };

  console.log(process.env.CLIENT_DOMAIN);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: [
        `${process.env.CLIENT_DOMAIN}`,
        "https://studio.apollographql.com",
      ],
    },
    context: async ({ req }): Promise<Context> => {
      const token = req.headers.authorization;
      if (!token) {
        return {
          userInfo: null,
        };
      }

      const userInfo = await getUserFromToken(token as string);
      return {
        userInfo,
      };
    },
  });

  const dbUrl = process.env.DB_CONN;

  if (!dbUrl) {
    throw new Error("DB connection is mandatory");
  }
  await mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  } as ConnectOptions);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("MongoDB Connected");
  });

  server.listen().then(({ url }: { url: string }) => {
    console.log("Server is ready at " + url);
  });
};

startServer();
