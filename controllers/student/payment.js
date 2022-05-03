const crypto = require("crypto");
const { Reference, Student } = require("../../models");
const { Profile, SetStatus } = require("../../services");
const { makeRequest } = require("../../utils");
const { validatePayment, validateTransfer } = require("../../validations/student/payment");

exports.handleInitPayment = async (request, response) => {
  const student = await Profile("student", request.user.id);
  const amount = request.body.amount;
  const validateUserPayment = validatePayment({ amount: amount });
  if (validateUserPayment.error) return response.status(400).json({ error: validateUserPayment.error.message });
  const options = {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phoneNumber: student.phoneNumber,
    metadata: { studentID: request.user.id },
    amount: amount * 100,
    currency: "NGN"
  };
  try {
    const initPayRes = await makeRequest.post("/transaction/initialize", options);
    const { data: { data: { authorization_url, reference }}} = initPayRes;

    const findRef = await Reference.findOne({ user: request.user.id });
    if (!findRef) {
      const createRef = new Reference({
        user: request.user.id,
        paymentReference: reference
      });

      await createRef.save();
      return response.status(200).json({
        message: "Sucessful",
        payStackUrl: authorization_url
      });
    }

    const modifyRef = await Reference.findByIdAndUpdate(findRef._id);
    modifyRef.reference = reference;
    await modifyRef.save();
    response.status(200).json({
      message: "Sucessful",
      payStackUrl: authorization_url
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to initialize payment." });
  }
};

exports.handleVerifyPayment = async (request, response, next) => {
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(request.body)).digest('hex');
    if (hash === request.headers['x-paystack-signature']) {
    // Retrieve the request's body
    const paystackResponse = request.body;
    const findRef = await Reference.findOne({ user: request.user.id });
    if (!findRef) return response.send(404);

    console.log(`Transaction made as at ${new Date()}`);
    console.log(paystackResponse.data.metadata);
  
    if (paystackResponse.event === "charge.success" && paystackResponse.data.status === "success") {
      await SetStatus(paystackResponse.data.metadata.studentID, "activate");
      // Send 200 response back to paystack to tell them that payment was successful
      response.send(200);
      // Calls the next middleware function
      return next()
    }
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
