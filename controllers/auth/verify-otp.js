const { Otp } = require("../../models");
const { calcTimeDifference } = require("../../helper");

exports.handleVerifyPassword = async (request, response) => {
  try {
    // Request body
    let otpValue = request.body.otp;
    // Failed cases
    if (!otpValue) return response.status(400).json({ error: "Enter an OTP sent to your mail." });
    const userOTP = otpValue;
    const otp = await Otp.findOne({ otpCode: userOTP });
    if (!otp) return response.status(404).json({ error: "Invalid OTP." });
    const dateNow = new Date().toLocaleString();
    // Checks for otp expiration
    if (calcTimeDifference(otp.time, dateNow) > 10) return response.status(422).json({ error: "OTP token expired." });
    // User reset password activated
    const verifyOTP = await Otp.findOneAndUpdate({ otpCode: userOTP });
    verifyOTP.isVerified = true;
    await verifyOTP.save();
    response.status(200).json({ message: "OTP verified, procced to reset your password." })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to verify password" });
  }
};
