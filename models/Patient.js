const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
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
  height: {
    type: String,
    required: [true, "Height is required"],
  },
  weight: {
    type: String,
    required: [true, "Weight is required"],
  },
  identityCardNo: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: [true, "birth date is required"],
  },
  gender: {
    type: String,
    required: [true, "gender is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  messages: {
    type: Array,
    default: [],
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
  appointments: {
    type: Array,
    default: [],
  },
  healthcare_plans: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model("patients", PatientSchema);
