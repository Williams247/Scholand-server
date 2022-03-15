const router = require("express").Router();

// Route to login a user
module.exports = router.post(
  "/auth/login",
  require("../../controllers/auth/login").handleLogin
);
