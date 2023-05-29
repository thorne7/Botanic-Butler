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
    date: []
  }
});

const fertilizingSchema = new mongoose.Schema({
  fertilizingLog: {
    type: [String],
    default: [],
    date: []
  }
});

const pruningSchema = new mongoose.Schema({
  pruningLog: {
    type: [String],
    default: [],
    date: []
  }
});

const Plant = mongoose.model('Plant', plantSchema, wateringSchema, fertilizingSchema, pruningSchema);

module.exports = Plant;

