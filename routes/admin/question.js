const router = require("express").Router();

const auth = require("../../middleware/auth").AuthAdmin;

// Route to get questions by subject ID
router.get(
  "/get-subject-questions/:subjectId",
  auth,
  require("../../controllers/admin/question").handleGetQuestions
);

// Route to get all subjects and questions
router.get(
  "/get-subjects",
  auth,
  require("../../controllers/admin/question").handleGetSubjects
);

// Route to get a subject by ID
router.get(
  "/get-subject/:subjectId",
  auth,
  require("../../controllers/admin/question").handleGetSubjectByID
);

// Route to create a subject and questions
router.post(
  "/set-question",
  auth,
  require("../../controllers/admin/question").handleSetSubjectAndQuestion
);

// Route to edit a subject
router.put(
  "/edit-subject/:subjectId",
  auth,
  require("../../controllers/admin/question").handleEditSubject
);

// Route to edit a subject
router.put(
  "/edit-question",
  auth,
  require("../../controllers/admin/question").handleEditQuestion
);

// Route to delete a particular question in a subject
router.delete(
  "/delete-question",
  auth,
  require("../../controllers/admin/question").handleDeleteQuestion
);

// Route to delete all questions in a subject
router.delete(
  "/delete-all-questions/:subjectId",
  auth,
  require("../../controllers/admin/question").handleDeleteAllQuestion
);

// Route to delete a subject
router.delete(
  "/delete-subject/:subjectId",
  auth,
  require("../../controllers/admin/question").handleDeleteSubject
);

// Route to delete all subjects
router.delete(
  "/delete-subject",
  auth,
  require("../../controllers/admin/question").handleDeleteAllSubjects
);

// Route to check for student who took part in a subject examination
router.get(
  "/student-exam/:subjectId",
  auth,
  require("../../controllers/admin/question").handleGetStudentExams
);

module.exports = router;
