const router = require("express").Router();

// Route to resend otp for a student
module.exports = router.post(
  "/auth/student/resend-otp",
  require("../../controllers/auth/resend-otp")
  .handleResendOTP({ resendOtpTo: "student", mailSubject: "Resend OTP" })
);

// Route to resend otp for an admin
module.exports = router.post(
  "/auth/admin/resend-otp",
  require("../../controllers/auth/resend-otp")
  .handleResendOTP({ resendOtpTo: "admin", mailSubject: "Resend OTP" })
);
