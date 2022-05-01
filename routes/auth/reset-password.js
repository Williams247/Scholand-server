const router = require("express").Router();

// Route to reset password for a student
module.exports = router.patch(
  "/reset-password",
  require("../../controllers/auth/reset-password")
  .handleResetPassword({ userType: "student" })
);

// Route to reset password for an admin
module.exports = router.patch(
  "/reset-password",
  require("../../controllers/auth/reset-password")
  .handleResetPassword({ userType: "admin" })
);
