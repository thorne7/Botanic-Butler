const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  wateringLogs: {
    type: [String],
    default: [],
  },
  fertilizingLogs: {
    type: [String],
    default: [],
  },
  pruningLogs: {
    type: [String],
    default: [],
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;