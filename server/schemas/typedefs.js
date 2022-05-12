const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Query {
    userID: String
  }

  type Mutation {
    signup(name: String!, password: String!, email: String!): User
    login(login: String!, password: String!): User
    logout: String
  }
`;

module.exports = typeDefs;
