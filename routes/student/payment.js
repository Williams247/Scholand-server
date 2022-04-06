const router = require("express").Router();

const auth = require("../../middleware/auth").AuthStudent;

router.post(
  "/initialize-payment",
  auth,
  require("../../controllers/student/payment").handleInitPayment
);

router.put(
  "/verify-payment",
  auth,
  require("../../controllers/student/payment").handleVerifyPayment
);

module.exports = router;
