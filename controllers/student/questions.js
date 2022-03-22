const { Question } = require("../../models/index");

// Gets all questions
exports.handleGetQuestions = async (request, response) => {
  try {
    const {params: { subjectId }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    const question = await Question.findById(subjectId).select("questionOptions");
    response.status(200).json({
      message: "Success.",
      results: question
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get question." });
  }
};

// Gets all subjects
exports.handleGetSubjects = async (request, response) => {
  try {
    const subjects = await Question.find();
    response.status(200).json({
      message: "Success",
      results: subjects,
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
    const subject = await Question.findById(subjectId);
    response.status(200).json({
      message: "Success.",
      results: subject
    })
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

    const hasSubmitted = question.students.filter(i => i.student.toString() === request.user.id.toString());

    if (hasSubmitted.length > 0) return response.status(409).json({
      error: "You've answered this question already."
    });

    const results = {
      student: request.user.id,
      score: score
    };

   question.students.push(results);

   const submition = await question.save();
   response.status(200).json({
     message: "Success.",
     results: submition
   });
    
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to send response." })
  }
};
