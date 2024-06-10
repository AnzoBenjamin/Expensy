const http = require("http");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const { connectDB } = require("./db/connectDB");
const { buildContext } = require("graphql-passport");
const connectMongo = require("connect-mongodb-session");
const configurePassport = require("./passport/passport.config");
const mergedTypeDefs = require("./typedefs");
const mergedResolvers = require("./resolvers");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const dotenv = require("dotenv");
const app = express();
dotenv.config();
configurePassport();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collections: "sessions",
});

store.on("error", (error) => {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
async function startServer() {
  const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",

    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),

    express.json(),

    // expressMiddleware accepts the same arguments:

    // an Apollo Server instance and optional configuration options

    expressMiddleware(server, {
      context: async ({ req }) => buildContext({ token: req.headers.token }),
    })
  );
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  await connectDB();
  console.log(`🚀 Server ready at http://localhost:4000/`);
}
startServer();

// Modified server startup
