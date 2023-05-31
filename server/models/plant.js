const mongoose = require('mongoose');

const wateringSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
});

const fertilizingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
});

const pruningSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
});

const plantSchema = new mongoose.Schema({
  common_name: {
    type: String,
    required: true,
  },
  scientific_name: {
    type: String,
  },
  wateringLogs: [wateringSchema],
  fertilizingLogs: [fertilizingSchema],
  pruningLogs: [pruningSchema],
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
