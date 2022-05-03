const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const referenceModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  paymentReference: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('referenceModel', referenceModel);
