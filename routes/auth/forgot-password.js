const router = require("express").Router();

// Route for forgot password
router.post(
  "/auth/student/forgot-password",
  require("../../controllers/auth/forgot-password").handleForgotPassword,
  require("../../controllers/auth/send-mail-generate-otp").handleSendMailGenerateOTP("student")
);


router.post(
  "/auth/admin/forgot-password",
  require("../../controllers/auth/forgot-password").handleForgotPassword,
  require("../../controllers/auth/send-mail-generate-otp").handleSendMailGenerateOTP("admin")
);

module.exports = router;
