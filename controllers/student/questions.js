const { Question } = require("../../models/questions");

// Gets all questions and subjects
exports.handleGetAllQuestionsAndSubjects = async (request, response) => {
  try {
    const questions = await Question.find();
    response.status(200).json({
      message: "Success",
      results: questions,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get all questions." });
  }
};
