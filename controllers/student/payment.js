const axios = require("axios");
const secret = require("crypto");

const { validatePayment } = require("../../validations/student/payment");

exports.handleInitPayment = async (request, response) => {
  try {
    const { body: { email, amount } } = request;
    const validateUserPayment = validatePayment(request.body);
    if (validateUserPayment.error) return response.status(400).json({
        error: validateUserPayment.error.message
    });
    const options = {
      email: email,
      amount: amount,
      currency: 'NGN',
      metadata: {
        cart_id:398,
         custom_fields :[{
          display_name: "Invoice ID",
          variable_name :"Invoice ID",
          value :209
        }]
      }
    }
    const paymentRes = await axios.post("https://api.paystack.co/transaction/initialize",
      options,
      {
        headers: {
          Authorization: "Bearer secret_key",
          'Content-Type': 'application/json'
        }
      }
    );
    response.status(200).json({
       message: "Payment initialized",
       results: paymentRes.data
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to initialize payment." })
  }
};

exports.handleVerifyPayment = (request, response) => {
  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(request.body)).digest('hex');
  if (hash == request.headers['x-paystack-signature']) {
    const res = request.body;
    console.log(res)
  }
};
