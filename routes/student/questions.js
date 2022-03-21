const router = require("express").Router();

const auth = require("../../middleware/auth");

// Route to get all subjects and questions
router.get("/student/get-questions-and-subjects",
  auth,
  require("../../controllers/student/questions").handleGetAllQuestionsAndSubjects
);

module.exports = router;
