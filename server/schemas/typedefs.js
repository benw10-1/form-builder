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

  type Prop {
    key: String
    value: String
  }

  type Piece {
    _id: ID
    _type: String!
    form_ref: ID!
    props: [Prop!]!
  }

  type Form {
    _id: ID!
    title: String!
    description: String
    endpoint: String
    published: Boolean!
    creator: User!
    piece_refs: [ID!]!
    createdAt: String!
  }

  type Response {
    _id: ID!
    form_ref: ID!
    responses: [Prop!]!
  }

  type Query {
    getMe: User
    getMyForms: [Form!]!
    getPiecesByID(id: ID!): [Piece!]!
    getPiecesByEndpoint(ep: String!): [Piece!]!
    getResponsesByForm(id: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String): Form!
    updateFormMeta(id: ID!, title: String!, description: String): Form
    updateFormPieces(id: ID!, pieces: [Piece!]!): Form
    signup(name: String!, password: String!, email: String!): Auth
    login(login: String!, password: String!): Auth
    respond(id: ID!, responses: [Prop!]!): Response!
  }
`;

module.exports = typeDefs;
