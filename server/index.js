const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require("path")
require("dotenv").config()

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')

const session = require("express-session")
const MongoStore = require("connect-mongo")

const PORT = process.env.PORT || 3001
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: ({ req }) => {
    return { ...req }
  }
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })
}

app.use(session({
  name: "qid",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongooseConnection: db, mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2,
    secure: process.env.NODE_ENV === "production"
  }
}))

server.start().then(() => {
  server.applyMiddleware({
    app,
    cors: true,
    context: ({ req }) => req
  })
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  })
})