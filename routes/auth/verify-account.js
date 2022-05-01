const router = require("express").Router();
const auth = require("../../middleware/auth").AuthStudent;

// Route to verify a student account
module.exports = router.post(
  "/student/verify-account",
  auth,
  require("../../controllers/auth/verify-account")
  .handleVerifyAccount({ verifyAs: "student" })
);

// Route to verify an admin account
module.exports = router.post(
  "/admin/verify-account",
  auth,
  require("../../controllers/auth/verify-account")
  .handleVerifyAccount({ verifyAs: "admin" })
);
