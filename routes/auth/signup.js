const router = require("express").Router();

// Route to signup a user
router.post(
  "/auth/student/signup",
  require("../../controllers/auth/signup").handleSignUp,
  require("../../controllers/auth/login").handleLogin("student", true)
);

module.exports = router;
