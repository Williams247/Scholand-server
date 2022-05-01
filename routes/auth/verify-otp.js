const router = require("express").Router();

// Route to verify otp
module.exports = router.post(
  "/verify-password",
  require("../../controllers/auth/verify-otp").handleVerifyPassword
);
