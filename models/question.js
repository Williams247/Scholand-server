const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Question = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  cutOffMark: Number,
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "Student"
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

module.exports = mongoose.model("Question", Question);
