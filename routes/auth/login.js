const router = require("express").Router();

// Route to login a user
router.post(
  "/auth/student/login",
  require("../../controllers/auth/login").handleLogin("student")
);

router.post(
  "/auth/admin/login",
  require("../../controllers/auth/login").handleLogin("admin")
);

module.exports = router;
