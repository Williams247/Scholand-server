const router = require("express").Router();

const auth = require("../../middleware/auth").AuthStudent;

router.post(
  "/initialize-payment",
  auth,
  require("../../controllers/student/payment").handleInitPayment
);

router.post(
  "/confirm-student-payment",
  require("../../controllers/student/payment").handleVerifyPayment
);

router.get(
  "/bank-list",
  auth,
  require("../../controllers/student/payment").handleGetBankList
);

router.post(
  "/resolve-account",
  auth,
  require("../../controllers/student/payment").handleResolveBankAccount
);

router.post(
  "/transfer",
  auth,
  require("../../controllers/student/payment").handleTransfer
);

module.exports = router;
