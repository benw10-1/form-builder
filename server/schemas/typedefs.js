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
    key: String!
    value: String!
  }

  type Piece {
    _id: ID!
    _type: String!
    form_ref: ID!
    props: [Prop!]!
  }

  input PropInp {
    key: String!
    value: String!
  }

  input PieceInp {
    _id: ID
    _type: String
    form_ref: ID
    props: [PropInp]!
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
    getFormByID(id: ID!): Form
    getPiecesQuestionTitle(ids: [ID!]!): [String!]!
    getFormByEndpoint(ep: String!): Form
  }

  type Mutation {
    createForm(title: String!, description: String): Form!
    updateFormMeta(id: ID!, title: String!, description: String): Form
    updateFormPieces(id: ID!, pieces: [PieceInp]!): Form
    signup(name: String!, password: String!, email: String!): Auth
    login(login: String!, password: String!): Auth
    respond(id: ID!, responses: [PropInp]!): Response!
    setPublished(id: ID!, published: Boolean!): Form
    deleteForm(id: ID!): Form
  }
`;

module.exports = typeDefs;
