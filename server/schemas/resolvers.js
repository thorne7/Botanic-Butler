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

      Plant: {
        wateringLogs: async (parent) => {
          return WateringLog.find({
            plantId: parent._id
          });
        },
        fertilizingLogs: async (parent) => {
          return FertilizingLog.find({
            plantId: parent._Id
          });
        },
        pruningLogs: async (parent) => {
          return PruningLog.find({
            plantId: parent._Id
          });
        },
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

      addWateringLog: async (parent, {
        plantId,
        date,
        notes
      }, context) => {
        // Implement the logic for adding a watering log here
      },
      addFertilizingLog: async (parent, {
        plantId,
        date,
        notes
      }, context) => {
        // Implement the logic for adding a fertilizing log here
      },
      addPruningLog: async (parent, {
        plantId,
        date,
        notes
      }, context) => {
        // Implement the logic for adding a pruning log here
      },
      addPlant: async (parent, {
        common_name,
        scientific_name,
      }, context) => {
        // Implement the logic for adding a plant model here
      }
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