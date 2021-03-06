const crypto = require("crypto");
const { Reference, Student } = require("../../models");
const { Profile, SetStatus } = require("../../services");
const { makeRequest } = require("../../utils");
const { validatePayment, validateResolve, validateTransfer } = require("../../validations/student/payment");

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

exports.handleVerifyPayment = async (request, response) => {
  let hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(request.body)).digest('hex');
   const hashCheck = hash === request.headers['x-paystack-signature'];
   if (!hashCheck) return response.sendStatus(400);
    // Retrieve the request body
    response.sendStatus(200);
    const paystackResponse = request.body;
    const studentUniqueID =  paystackResponse.data.metadata.studentID;
    const findRef = await Reference.findOne({ user: studentUniqueID });
    if (!findRef) return response.sendStatus(404);
    if (paystackResponse.event === "charge.success" && paystackResponse.data.status === "success" && paystackResponse.data.reference === findRef.paymentReference) {
      console.log(`Transaction made as at ${new Date()}`);
      console.log(paystackResponse);
      await SetStatus(studentUniqueID, "activate");
      await Reference.findOneAndDelete({ user: studentUniqueID });
  }
};

// Banks that are supported by paystack API
exports.handleGetBankList = async (request, response) => {
  try {
    const bankList = await makeRequest.get("/bank?currency=NGN");
    const { data: { message, data } } = bankList;
    response.status(200).json({
      message: message,
      results: data
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to verify account number." })
  }
};

exports.handleResolveBankAccount = async (request, response) => {
  try {
    const {body: { accountNumber, bankCode }} = request;
    const validateUserResolveAccount = validateResolve({
      accountNumber: accountNumber,
      bankCode: bankCode
    });
    if (validateUserResolveAccount.error) return response.status(400).json({ error: validateUserResolveAccount.error.message });
    const resolvedAccount = await makeRequest.get(`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`);
    const { data: { message, data }} = resolvedAccount;
    response.status(200).json({
      message: message,
      results: data
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to resolve." })
  }
};

exports.handleTransfer = async (request, response) => {
  try {
    const {body: { accountName, accountNumber, bankCode }} = request;
    const validateUserTransferDetails = validateTransfer({
      accountName: accountName,
      accountNumber: accountNumber,
      bankCode: bankCode
    });
    if (validateUserTransferDetails.error) return response.status(400).json({ error: validateUserTransferDetails.error.message });
    const createRecipient = await makeRequest.post("/transferrecipient", {
      type: "nuban",
      name: accountName,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: "NGN"
    });
    console.log(createRecipient)
    // Initial the transfer here
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to transfer." })
  }
}

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
