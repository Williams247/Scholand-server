const router = require("express").Router();

const auth = require("../../middleware/auth").AuthStudent;

router.post(
  "/initialize-payment",
  auth,
  require("../../controllers/student/payment").handleInitPayment
);

router.post(
  "/payment-transaction-verificaton",
  require("../../controllers/student/payment").handleVerifyPayment
  // require("../../controllers/redirect").handleRedirect({ withMessage: true, responseMessage: "Account Activated" })
);

router.get(
  "/bank-list",
  auth,
  require("../../controllers/student/payment").handleVerifyAccount
);

// router.post(
//   "/create-receipt",
//   auth,
//   require("../../controllers/student/payment").handleCreateTransferReceipt
// );

module.exports = router;
