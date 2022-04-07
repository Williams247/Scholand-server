const router = require("express").Router();

// Route to resend otp for a student
module.exports = router.patch(
  "/student/resend-otp",
  require("../../controllers/auth/resend-otp")
  .handleResendOTP({ resendOtpTo: "student", mailSubject: "Resend OTP" })
);

// Route to resend otp for an admin
module.exports = router.patch(
  "/admin/resend-otp",
  require("../../controllers/auth/resend-otp")
  .handleResendOTP({ resendOtpTo: "admin", mailSubject: "Resend OTP" })
);
