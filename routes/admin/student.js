const router = require("express").Router();

const auth = require("../../middleware/auth").AuthAdmin;

// Route to 
router.get(
  "/get-students",
  auth,
  require("../../controllers/admin/student").handleGetStudents
);

router.get(
  "/get-student/:id",
  auth,
  require("../../controllers/admin/student").handleGetStudent
);

module.exports = router;
