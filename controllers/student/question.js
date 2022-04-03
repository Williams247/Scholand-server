const { Question } = require("../../models");
const { noQuestion, noSubject } = require("../../constants");

// Gets all questions
exports.handleGetQuestions = async (request, response) => {
  try {
    const {params: { subjectId }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    const question = await Question.findById(subjectId).select("questionOptions");
    if (!question) return response.status(404).json({ error: noQuestion });
    response.status(200).json({
      message: "Success.",
      results: question ? question : []
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get question." });
  }
};

// Gets all subjects
exports.handleGetSubjects = async (request, response) => {
  try {
    const subjects = await Question.find().populate({
      path: "creator",
      select: "-password -role"
    });

    response.status(200).json({
      message: "Success",
      results: subjects ? subjects : []
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get all subjects." });
  }
};

// Gets a subject by ID
exports.handleGetSubjectByID = async (request, response) => {
  try {
    const {params: { subjectId }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    const subject = await Question.findById(subjectId).populate({
      path: "creator",
      select: "-password -role"
    });

    if (!subject) return response.status(404).json({ error: noSubject });

    response.status(200).json({
      message: "Success.",
      results: subject ? subject : []
    });
    
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get subject." });
  }
};

// Submits a question
exports.handleSubmitQuestions = async (request, response) => {
  try {
    const {params: { subjectId }, body: { score }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    if (!score) return response.status(400).json({ error: "Provide a score." });
    const question = await Question.findByIdAndUpdate(subjectId);
    if (!question) return response.status(404).json({ error: noSubject });

    const hasSubmitted = question.students.filter(i => i.student.toString() === request.user.id.toString());

    if (hasSubmitted.length > 0) return response.status(409).json({
      error: "You've already done this examination."
    });

    const results = {
      student: request.user.id,
      score: score
    };

   question.students.push(results);

   await question.save();
   response.status(200).json({
     message: "Submitted.",
     result: {
       score: score
     }
   });
    
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to send response." });
  }
};
