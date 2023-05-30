const {
  AuthenticationError
} = require('apollo-server-express');

const {
  User
} = require('../models');

const {
  signToken
} = require('../utils/auth');

const {
  searchPlants
} = require('../utils/trefleApi');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, {
      username
    }) => {
      return User.findOne({
        username
      });
    },
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return User.findOne({
        _id: context.user._id
      });
    },
    searchPlant: async (parent, {
      query
    }, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      const data = await searchPlants(query);
      console.log(data);
      return data.data;
    },
  },
  Plant: {
    wateringLogs: async (parent) => {
      return WateringLog.find({
        plantId: parent._id
      });
    },
    fertilizingLogs: async (parent) => {
      return FertilizingLog.find({
        plantId: parent._id
      });
    },
    pruningLogs: async (parent) => {
      return PruningLog.find({
        plantId: parent._id
      });
    },
  },


  Mutation: {
    addUser: async (parent, {
      username,
      email,
      password
    }) => {
      const user = await User.create({
        username,
        email,
        password
      });
      const token = signToken(user);
      return {
        token,
        user,
      };
    },

    login: async (parent, {
      email,
      password
    }) => {
      const user = await User.findOne({
        email
      });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return {
        token,
        user,
      };
    },

    addPlant: async (parent, { common_name, scientific_name }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('Authentication required');
      }
    
      try {
        // Create a new plant
        const plant = await Plant.create({
          common_name,
          scientific_name,
          ownerId: context.user._id, // Set the owner ID of the plant
        });
    
        // Add the plant ID to the user's plants array
        await User.findByIdAndUpdate(context.user._id, {
          $push: { plants: plant._id },
        });
    
        return plant;
      } catch (error) {
        throw new Error('Failed to add plant');
      }
    },
    addWateringLog: async (parent, { plantId, date, notes }, context) => {
      // Implement the logic for adding a watering log here
      const newWateringLog = await WateringLog.create({ plantId, date, notes });
      return newWateringLog;
    },
    addFertilizingLog: async (parent, { plantId, date, notes }, context) => {
      // Implement the logic for adding a fertilizing log here
      const newFertilizingLog = await FertilizingLog.create({ plantId, date, notes });
      return newFertilizingLog;
    },
    addPruningLog: async (parent, { plantId, date, notes }, context) => {
      // Implement the logic for adding a pruning log here
      const newPruningLog = await PruningLog.create({ plantId, date, notes });
      return newPruningLog;
    },

  },

  Plant: {
    wateringLogs: async (parent) => {
      return WateringLog.find({
        plantId: parent._id
      });
    },
    fertilizingLogs: async (parent) => {
      return FertilizingLog.find({
        plantId: parent._id
      });
    },
    pruningLogs: async (parent) => {
      return PruningLog.find({
        plantId: parent._id
      });
    },
  },
};

module.exports = resolvers;