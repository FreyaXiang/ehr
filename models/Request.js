const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This schema is used for:
// 1. Doctor sends addPatient request to patient
// 2. Patient sends agree addPatient message to doctor
// 3. Patient sends makeAppointment request to doctor
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
