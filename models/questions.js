const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const question = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "admin", required: true },
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "student",
        required: true,
      },
      score: Number,
    },
  ],
  title: { type: String, required: true },
  questionOptions: [
    {
      question: { type: String, required: true },
      options: {
        optionA: {
          title: String,
          value: Boolean
        },
        optionB: {
          title: String,
          value: Boolean
        },
        optionC: {
          title: String,
          value: Boolean
        },
        optionD: {
          title: String,
          value: Boolean
        },
      },
    },
  ],
});

module.exports = mongoose.model("question", question);
