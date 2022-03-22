const router = require("express").Router();

const auth = require("../../middleware/auth");

// Route to get questions by subject ID
router.get(
  "/get-subject-questions/:subjectId",
  auth,
  require("../../controllers/student/question").handleGetQuestions
);

// Route to get all subjects and questions
router.get(
  "/get-subjects",
  auth,
  require("../../controllers/student/question").handleGetSubjects
);

// Route to get a subject by ID
router.get(
  "/get-subject/:subjectId",
  auth,
  require("../../controllers/student/question").handleGetSubjectByID
);

router.post(
  "/submit-question/:subjectId",
  auth,
  require("../../controllers/student/question").handleSubmitQuestions
);

module.exports = router;
