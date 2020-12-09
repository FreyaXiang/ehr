const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema_drug = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  dosage: {
    type: String,
  },
  side_effects: {
    type: String,
  },
  price: {
    type: Number,
  },
});

module.exports = Drug = mongoose.model("drugs", schema_drug);
