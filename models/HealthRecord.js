const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This schema is used for keeping patient health records
const schema_health_record = new mongoose.Schema({
  patientID: {
    type: String,
    default: [],
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = HealthRecord = mongoose.model(
  "healthRecords",
  schema_health_record
);
