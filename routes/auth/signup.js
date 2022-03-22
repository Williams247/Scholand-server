const router = require("express").Router();

// Route to signup a user
router.post(
  "/student/signup",
  require("../../controllers/auth/signup").handleSignUp({ signUpAs: "student" }),
  require("../../controllers/auth/send-mail-generate-otp")
  .handleSendMailGenerateOTP({ sendOtpTo: "student", withLogin: true, mailSubject: "Verify Account." }),
  require("../../controllers/auth/login").handleLogin({ loginAs: "student", withSignUp: true })
);

// Route to signup an admin
router.post(
  "/admin/signup",
  require("../../controllers/auth/signup").handleSignUp({ signUpAs: "admin" }),
  require("../../controllers/auth/login").handleLogin({ loginAs: "admin", withSignUp: true })
);

module.exports = router;
