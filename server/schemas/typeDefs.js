const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Plant {
    id: String!
    common_name: String!
    scientific_name: String!
    genus: String
    family: String


  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    searchPlant(query: String!): [Plant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
