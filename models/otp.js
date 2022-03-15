const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otp = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  email: {
    type: String,
    required: true
  },
  otpCode: {
    type: Number,
    required: true,
    min: 4
  },
  isVerified: {
    type: Boolean,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("otp", otp);
