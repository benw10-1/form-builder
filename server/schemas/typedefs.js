const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Props {
    title: String
    content: String
  }

  type Piece {
    _id: ID!
    _type: String!
    data: Props!
  }

  type Form {
    _id: ID!
    title: String!
    description: String
    creator: User!
    pieces: [Piece!]!
  }

  type Query {
    thisUser: User
    getForm: Form
  }

  type Mutation {
    signup(name: String!, password: String!, email: String!): Auth
    login(login: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
