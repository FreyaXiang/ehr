const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This schema is used for storing user information
// Combined for Patient, Doctor, and Staff
const UserSchema = new Schema({
  // fields for three roles
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
  // fields for patients/doctors
  appointments: {
    type: Array,
    default: [],
  },
  patients: {
    // for doctors
    type: Array,
    default: [],
  },
  staff: {
    // for staff
    type: Array,
    default: [],
  },
  messages: {
    type: Array,
    default: [],
  },
  // fields for patients only
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
  prescriptions: {
    type: Array,
    default: [],
  },
  // fields for staff/doctors only
  org: {
    type: String,
  },
  workId: {
    type: String,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
