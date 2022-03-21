const router = require("express").Router();

// Route to login a student
router.post(
  "/auth/student/login",
  require("../../controllers/auth/login")
  .handleLogin({ loginAs: "student", withSignUp: false })
);

// Route to login an admin
router.post(
  "/auth/admin/login",
  require("../../controllers/auth/login")
  .handleLogin({ loginAs: "admin", withSignUp: false })
);

module.exports = router;
