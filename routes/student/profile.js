const router = require("express").Router();

const auth = require("../../middleware/auth");

// Route to get a user profile
router.get(
  "/student/profile",
  auth,
  require("../../controllers/student/profile").handleGetProfile
);

// Route to update a user profile
router.put(
  "/student/update-profile",
  auth,
  require("../../controllers/student/profile").handleUpdateProfile
);

module.exports = router;
