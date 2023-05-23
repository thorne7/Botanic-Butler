const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const wateringSchema = new mongoose.Schema({
  wateringLog: {
    type: [String],
    default: [],
  }
});

const fertilizingSchema = new mongoose.Schema({
  fertilizingLog: {
    type: [String],
    default: [],
  }
});

const pruningSchema = new mongoose.Schema({
  pruningLog: {
    type: [String],
    default: [],
  }
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
