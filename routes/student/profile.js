const router = require("express").Router();

const auth = require("../../middleware/auth").AuthStudent;

// Route to get a user profile
router.get(
  "/profile",
  auth,
  require("../../controllers/student/profile").handleGetProfile
);

// Route to update a user profile
router.put(
  "/update-profile",
  auth,
  require("../../controllers/student/profile").handleUpdateProfile
);

module.exports = router;
