const router = require("express").Router();

// Route to login a student
router.post(
  "/student/login",
  require("../../controllers/auth/login")
  .handleLogin({ loginAs: "student", withSignUp: false })
);

// Route to login an admin
router.post(
  "/admin/login",
  require("../../controllers/auth/login")
  .handleLogin({ loginAs: "admin", withSignUp: false })
);

module.exports = router;
