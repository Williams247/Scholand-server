const router = require("express").Router();

const auth = require("../../middleware/auth").AuthStudent;

router.post(
  "/initialize-payment",
  auth,
  require("../../controllers/student/payment").handleInitPayment
);
router.post(
  "/verify-payment",
  auth,
  require("../../controllers/student/payment").handleVerifyPayment
);

module.exports = router;
