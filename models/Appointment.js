const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This schema is used for doctor making appointments
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

module.exports = Appointment = mongoose.model(
  "appointments",
  schema_appointment
);
