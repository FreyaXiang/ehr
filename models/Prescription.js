const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This schema is used for keeping prescription info
// Will be displayed in patient dashboard
const schema_prescription = new Schema({
  drugs: {
    type: String,
    required: [true, "medications required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  doctorName: {
    type: String,
    default: "",
  },
  doctorEmail: {
    type: String,
  },
  patientEmail: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = Prescription = mongoose.model(
  "prescription",
  schema_prescription
);
