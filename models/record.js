const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema_appointment = new Schema({
  patientEmail: {
    type: String,
    default: "",
  },
  doctorId: {
    type: String,
    default: "",
  },
  patientName: {
    type: String,
    default: "",
  },
  doctorName: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const schema_health_record = new mongoose.Schema({
  patientID: {
    type: String,
    default: [],
  },
  data: {
    type: Array,
    default: [],
  },
});

module.exports = Appointment = mongoose.model(
  "appointments",
  schema_appointment
);

module.exports = HealthRecord = mongoose.model(
  "healthRecords",
  schema_health_record
);
