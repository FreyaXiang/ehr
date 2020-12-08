const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const requestSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  userEmail: {
    type: String,
  },
  comments: {
    type: String,
  },
});

module.exports = Request = mongoose.model("requsts", requestSchema);
