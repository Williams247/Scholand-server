const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student = new Schema({
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
  phoneNumber: {
    type: Number,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  isActive: Boolean,
  sex: String,
  dob: Date,
  studyLevel: String,
  accountNumber: Number,
  accountName: String,
  bankName: String,
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Student", Student);
