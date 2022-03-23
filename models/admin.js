const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Admin = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 25,
    min: 3
  },
  lastName: {
    type: String,
    required: true,
    max: 25,
    min: 3
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Admin", Admin);
