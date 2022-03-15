const { SendMailGenerateOTP } = require("../../services/index");

exports.handleForgotPassword = async (request, response) => {
  try {
    // Request body for email
    const email = request.body.email;
    // Failed
    if (!email) return response.status(400).json({ error: "Enter your email." });
    // Passed
    const sendMailOTP = await SendMailGenerateOTP(email);
    return response.status(200).json({ message: sendMailOTP });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Forgot password failed." });
  }
};
