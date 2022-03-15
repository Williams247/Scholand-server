const router = require("express").Router();
const auth = require("../../middleware");

// Route to resend otp
module.exports = router.post(
  "/auth/resend-otp",
  auth,
  require("../../controllers/auth/resend-otp").handleResendOTP
);
