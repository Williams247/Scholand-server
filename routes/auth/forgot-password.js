const router = require("express").Router();

// Route for forgot password
module.exports = router.post(
  "/auth/forgot-password",
  require("../../controllers/auth/forgot-password").handleForgotPassword
);
