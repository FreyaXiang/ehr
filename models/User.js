const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
  role: {
    type: String,
    require: true,
  },
  appointments: {
    type: Array,
    default: [],
  },
  patients: {
    type: Array,
    default: [],
  },
  staff: {
    type: Array,
    default: [],
  },
  messages: {
    type: Array,
    default: [],
  },
  height: {
    type: String,
    default: "",
  },
  weight: {
    type: String,
  },
  identityCardNo: {
    type: String,
  },
  birth: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  allergies: {
    type: Array,
    default: [],
  },
  disabilities: {
    type: Array,
    default: [],
  },
  health_records: {
    type: Array,
    default: [],
  },
  visitation_records: {
    type: Array,
    default: [],
  },
  payment_records: {
    type: Array,
    default: [],
  },
  org: {
    type: String,
  },
  workId: {
    type: String,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
