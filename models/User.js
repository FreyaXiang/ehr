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
    default: function () {
      if (this.role === "staff") {
        return [];
      } else if (this.role === "patient") {
        return null;
      }
    },
  },
  staff: {
    type: Array,
    default: function () {
      if (this.role === "staff") {
        return null;
      } else if (this.role === "patient") {
        return [];
      }
    },
  },
});

module.exports = User = mongoose.model("users", UserSchema);
