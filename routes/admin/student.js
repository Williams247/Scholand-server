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

router.put(
  "/activate-student/:id",
  auth,
  require("../../controllers/admin/activate-deactivate").handleActivateStudent
);

router.put(
  "/deactivate-student/:id",
  auth,
  require("../../controllers/admin/activate-deactivate").handleDeactivateStudent
);


module.exports = router;
