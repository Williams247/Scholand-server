const router = require("express").Router();

// Route for forgot password for a student
router.post(
  "/student/forgot-password",
  require("../../controllers/auth/forgot-password").handleForgotPassword,
  require("../../controllers/auth/send-mail-generate-otp")
  .handleSendMailGenerateOTP({ sendOtpTo: "student", withLogin: false, mailSubject: "Forgot Password." })
);

// Route for forgot password for an admin
router.post(
  "/admin/forgot-password",
  require("../../controllers/auth/forgot-password").handleForgotPassword,
  require("../../controllers/auth/send-mail-generate-otp")
  .handleSendMailGenerateOTP({ sendOtpTo: "admin", withLogin: false, mailSubject: "Forgot Password." })
);

module.exports = router;
