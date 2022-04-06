const { makeRequest } = require("../../utils");
const { validatePayment } = require("../../validations/student/payment");
const { Student } = require("../../models")

exports.handleInitPayment = async (request, response) => {
  const {body: { email, amount }} = request;
  const validateUserPayment = validatePayment(request.body);
  if (validateUserPayment.error) return response.status(400).json({ error: validateUserPayment.error.message });
  const options = {
    email: email,
    amount: amount * 100,
    currency: "NGN"
  };
  try {
    const initPayRes = await makeRequest.post("/transaction/initialize", options);
    console.log(initPayRes.data)
    response.status(200).json({
      message: "Sucessful",
      results: initPayRes.data
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to initialize payment." });
  }
};

exports.handleVerifyPayment = async (request, response) => {
  try {
    const {query: { reference }} = request;
    if (!reference) return response.status(400).json({ error: "Add your reference" });
    const verifyPaymentRes = await makeRequest.get(`/transaction/verify/${reference}`);
    const { data } = verifyPaymentRes;
    if (data.data.status !== "success" && reference !== data.data.reference) {
      return response.status(422).json({ error: "Paymanent failed." })
    }
    if (data.data.status === "success" && reference === data.data.reference) {
      const student = await Student.findByIdAndUpdate(request.user.id);
      student.isActive = true;
      await student.save();
      response.status(200).json({
        message: "Congratulations, your account has been activated.",
        results: data
      })
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to verify payment." });
  }
};
