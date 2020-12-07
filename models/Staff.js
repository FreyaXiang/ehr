const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orz: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  workId: {
    type: String,
    required: true,
  },
  messages: {
    type: Array,
    default: [],
  },
  visitation_records: {
    type: Array,
    default: [],
  },
  appointments: {
    type: Array,
    default: [],
  },
});

module.exports = Staff = mongoose.model("staff", StaffSchema);
