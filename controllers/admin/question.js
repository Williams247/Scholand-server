const { Question } = require("../../models");
const { validateQuestion } = require("../../validations/admin/questions");
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
      results: question
    });

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
      select: "-password",
    });
    
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

    const subject = await Question.findById(subjectId).populate({
      path: "creator",
      select: "-password"
    });

    if (!subject) return response.status(404).json({ error: noSubject });

    response.status(200).json({
      message: "Success.",
      results: subject
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get subject." });
  }
};

// Creates a subject and questions.
exports.handleSetSubjectAndQuestion = async (request, response) => {
   try {
    const { body: { title, adminQuestion, cutOffMark, options }} = request;

    const validateSetQuestion = validateQuestion({
      title: title,
      cutOffMark: cutOffMark,
      adminQuestion: adminQuestion,
      options: options
    });

    if (validateSetQuestion.error) return response.status(400).json({
      error: validateSetQuestion.error.message
    });

    const adminTitle = title.toUpperCase();
    const question = await Question.findOne({ title: adminTitle });

    if (question) {
      const createQuestion = await Question.findByIdAndUpdate(question._id);
      createQuestion.questionOptions.push({
        question: adminQuestion,
        cutOffMark: cutOffMark,
        options: options
      });

      const questions = await createQuestion.save();
      return response.status(200).json({
        message: "Question added.",
        results: questions
      })
    };

    const createQuestion = new Question({
        creator: request.user.id,
        title: adminTitle,
        cutOffMark: cutOffMark,
        questionOptions: [
          {
            question: adminQuestion,
            options: options
          }
        ]
    });

    const questions = await createQuestion.save();

    response.status(201).json({
      message: "Question created.",
      results: questions
    });

   } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to set questions." })
   }
};

// Edit a subject
exports.handleEditSubject = async (request, response) => {
  try {
    const {params: { subjectId }, body: { title }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide  subject ID." });
    if (!title) return response.status(400).json({ error: "Provide a title." });
    const updatedTitle = title.toUpperCase();
    const subject = await Question.findByIdAndUpdate(subjectId);
    if (!subject) return response.status(404).json({ error: noSubject });
    subject.title = updatedTitle;

    const updatedSubject = await subject.save();

    response.status(200).json({
      message: "Subject edited.",
      results: updatedSubject
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to edit subject." });
  }
};

// Edit a particular question
exports.handleEditQuestion = async (request, response) => {
  try {
    const {query: { subjectId, questionId }, body: { adminQuestion, options }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    if (!questionId) return response.status(400).json({ error: "Provide a question ID" });
    const question = await Question.findOne({ _id: subjectId });
    if (!question) return response.status(404).json({ error: noQuestion });

    for (let i = 0; i < question.questionOptions.length; i++) {
      console.log(question.questionOptions[i])
      if (questionId.toString() === question.questionOptions[i]._id.toString()) {
          question.questionOptions[i].question = adminQuestion,
          question.questionOptions[i].options = options
      }
    }
    
    const updatedQuestions = await question.save();
      response.status(200).json({
      message: "Question updated.",
      results: updatedQuestions
   });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to edit question." })
  }
};

// Delete a particular question.
exports.handleDeleteQuestion = async (request, response) => {
  try {
    const {query: { subjectId, questionId }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    if (!questionId) return response.status(400).json({ error: "Provide a question ID" });
    const question = await Question.findOne({ _id: subjectId });
    if (!question) return response.status(404).json({ error: noQuestion });
    const currentQuestions = question.questionOptions.filter(i => i._id.toString() !== questionId.toString());
    question.questionOptions = currentQuestions;
    const updatedQuestions = await question.save();

    response.status(200).json({
      message: "Question deleted.",
      results: updatedQuestions
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to delete question." });
  }
};

// Delete all Question.
exports.handleDeleteAllQuestion = async (request, response) => {
  try {
    const {params: { subjectId }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    const question = await Question.findOne({ _id: subjectId });
    if (!question) return response.status(404).json({ error: noQuestion });
    question.questionOptions = [];
    await question.save();
    response.status(200).json({ message: "Questions deleted." })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to delete all questions." })
  }
};

// Deletes a subject.
exports.handleDeleteSubject = async (request, response) => {
  const {params: { subjectId }} = request;
  try {
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });
    const deleteQuestion = await Question.findByIdAndDelete(subjectId);
    if (!deleteQuestion) return response.status(404).json({ error: noSubject })
    response.status(200).json({ message: "Subject deleted." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to delete subject." });
  }
};

// Gets a list of students who has written a subject's quiz
exports.handleGetStudentExams = async (request, response) => {
  try {
    const {params: { subjectId }} = request;
    if (!subjectId) return response.status(400).json({ error: "Provide a subject ID." });

    const studentExams = await Question.findById({ _id: subjectId }).populate({
      path: "students",
      populate: {
        path: "student",
        select: "-password"
      }
    });

    if (!studentExams) return response.status(404).json({ error: noSubject });

    response.status(200).json({
      message: "Success.",
      results: studentExams
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get student exams" })
  }
}

// Deletes all subjects.
exports.handleDeleteAllSubjects = async (request, response) => {
  try {
    await Question.deleteMany({});
    response.status(200).json({ message: "Subjects deleted." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to delete all subjects." });
  }
};
