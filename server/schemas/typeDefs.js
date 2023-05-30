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
    _id: String!
    common_name: String!
    scientific_name: String
    wateringLogs: [WateringLog]
    fertilizingLogs: [FertilizingLog]
    pruningLogs: [PruningLog]
  }

  type WateringLog {
    _id: ID
    plant: Plant
    date: String
    notes: String
  }

  type FertilizingLog {
    _id: ID
    plant: Plant
    date: String
    notes: String
  }

  type PruningLog {
    _id: ID
    plant: Plant
    date: String
    notes: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    searchPlant(query: String!): [Plant]
    plants: [Plant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWateringLog(plantId: String!, date: String, notes: String): WateringLog
    addFertilizingLog(plantId: String!, date: String, notes: String): FertilizingLog
    addPruningLog(plantId: String!, date: String, notes: String): PruningLog
    addPlant(common_name: String!, scientific_name: String): Plant 
  }
`;

module.exports = typeDefs;
