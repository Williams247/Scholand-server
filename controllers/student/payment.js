const crypto = require("crypto");
const { Student } = require("../../models");
const { makeRequest } = require("../../utils");
const { validatePayment, validateTransfer } = require("../../validations/student/payment");

exports.handleInitPayment = async (request, response) => {
  const student = await Student.findById(request.user.id);
  const validateUserPayment = validatePayment(request.body);
  if (validateUserPayment.error) return response.status(400).json({ error: validateUserPayment.error.message });
  const options = {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phoneNumber: student.phoneNumber,
    metadata: {
      paymentDescription: "To buy past question."
    },
    amount: amount * 100,
    currency: "NGN"
  };
  try {
    const initPayRes = await makeRequest.post("/transaction/initialize", options);
    const { data: { data: { authorization_url }}} = initPayRes;
    response.status(200).json({
      message: "Sucessful",
      payStackUrl: authorization_url
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to initialize payment." });
  }
};

exports.handleVerifyPayment = (request, response) => {
    console.log('STARTING ======= Webhook was called by PAYSTACK, Log are below!')
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(request.body)).digest('hex');
    if (hash == request.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const res = request.body
    console.log('Webhook was called by PAYSTACK, Log are below!')
    console.log(res)
  }
};

// exports.handleVerifyPayment = async (request, response) => {
//   try {
//     const {query: { reference }} = request;
//     if (!reference) return response.status(400).json({ error: "Add your reference" });
//     const verifyPaymentRes = await makeRequest.get(`/transaction/verify/${reference}`);
//     const { data } = verifyPaymentRes;
//     if (data.data.status !== "success" && reference !== data.data.reference) {
//       return response.status(422).json({ error: "Paymanent failed." })
//     }
//     if (data.data.status === "success" && reference === data.data.reference) {
//       const student = await Student.findByIdAndUpdate(request.user.id);
//       student.isActive = true;
//       await student.save();
//       response.status(200).json({ message: "Congratulations, your account has been activated." });
//     }
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({ error: "Failed to verify payment." });
//   }
// };

// Banks that are supported by paystack API
exports.handleVerifyAccount = async (request, response) => {
  try {
    const verifyAccountRes = await makeRequest.get("/bank?currency=NGN");
    const { data: { message, data } } = verifyAccountRes;
    response.status(200).json({
      message: message,
      results: data
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to verify account number." })
  }
};

// exports.handleCreateTransferReceipt = async (request, response) => {
//   const {body: { type, name, account_number, bank_code, currency }} = request;
//   const validateUserTransfer = validateTransfer
//   try {
//     const createTransactionReceiptRes = await makeRequest.post("/transferrecipient");
//     console.log(createTransactionReceiptRes);
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({ error: "Failed to create transaction receipt." })
//   }
// };
