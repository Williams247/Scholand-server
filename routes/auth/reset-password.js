const router = require("express").Router();

// Route to reset password for a student
module.exports = router.post(
  "/auth/reset-password",
  require("../../controllers/auth/reset-password")
  .handleResetPassword({ userType: "student" })
);

// Route to reset password for an admin
module.exports = router.post(
  "/auth/reset-password",
  require("../../controllers/auth/reset-password")
  .handleResetPassword({ userType: "admin" })
);
