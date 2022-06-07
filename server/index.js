const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const path = require("path")

const db = require('./config/connection')

const { typeDefs, resolvers } = require('./schemas')
const { authMiddleware } = require('./utils/auth')
require("dotenv").config()

const PORT = process.env.PORT || 3001
const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: authMiddleware,
  playground: false,
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  app.use(express.static(path.join(__dirname, "../client/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })
}
db.once('open', () => {
  server.start().then(() => {
    server.applyMiddleware({
      app,
      cors: true
    })
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    })
  })
})