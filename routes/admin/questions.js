const router = require("express").Router();

const auth = require("../../middleware/auth");

// Route to get all subjects and questions
router.get(
  "/get-questions-and-subjects",
  auth,
  require("../../controllers/admin/questions").handleGetAllQuestionsAndSubjects
);

// Route to create a subject and questions
router.post(
  "/set-question",
  auth,
  require("../../controllers/admin/questions").handleSetSubjectAndQuestion
);

// Route to edit a subject
router.put(
  "/edit-subject/:subjectId",
  auth,
  require("../../controllers/admin/questions").handleEditSubject
);

// Route to edit a subject
router.put(
  "/edit-question",
  auth,
  require("../../controllers/admin/questions").handleEditQuestion
);

// Route to delete a particular question in a subject
router.delete(
  "/delete-question",
  auth,
  require("../../controllers/admin/questions").handleDeleteQuestion
);

// Route to delete all questions in a subject
router.delete(
  "/delete-all-questions/:subjectId",
  auth,
  require("../../controllers/admin/questions").handleDeleteAllQuestion
);

// Route to delete a subject
router.delete(
  "/delete-subject/:subjectId",
  auth,
  require("../../controllers/admin/questions").handleDeleteSubject
);

// Route to delete all subjects
router.delete(
  "/delete-subject",
  auth,
  require("../../controllers/admin/questions").handleDeleteAllSubjects
);

module.exports = router;
