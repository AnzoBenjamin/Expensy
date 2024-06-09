const http = require("http");
const cors = require("cors");
const express = require("express");
const {connectDB} = require('./db/connectDB')
const mergedTypeDefs = require("./typedefs");
const mergedResolvers = require("./resolvers");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const dotenv = require('dotenv')
const app = express();
dotenv.config()
const httpServer = http.createServer(app);

async function startServer() {
  const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers:mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",

    cors(),

    express.json(),

    // expressMiddleware accepts the same arguments:

    // an Apollo Server instance and optional configuration options

    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  await connectDB();
  console.log(`🚀 Server ready at http://localhost:4000/`);
}
startServer();

// Modified server startup
