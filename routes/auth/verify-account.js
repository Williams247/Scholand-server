const router = require("express").Router();
const auth = require("../../middleware/auth");

// Route to verify account
module.exports = router.post(
  "/auth/verify-account",
  auth,
  require("../../controllers/auth/verify-account").handleVerifyAccount
);
