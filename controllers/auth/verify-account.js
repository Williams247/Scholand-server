const { Otp, Student } = require("../../models/index");
const { calcTimeDifference } = require("../../helper");

exports.handleVerifyAccount = async (request, response) => {
  try {
    // Request body
    let otpValue = request.body.otp;
    // Failed cases
    if (!otpValue) return response.status(400).json({ error: "Enter an OTP sent to your mail." });
    const userOTP = otpValue;
    const otp = await Otp.findOne({ otpCode: userOTP });
    if (!otp) {
      response.status(404).json({ error: "Invalid OTP." });
      return false
    }
    const dateNow = new Date().toLocaleString();
    // Checks for otp expiration
    if (calcTimeDifference(otp.time, dateNow) > 10) return response.status(422).json({ error: "OTP token expired." });
    // User reset password activated
    const student = await Student.findByIdAndUpdate(request.user.id);
    student.verified = true;
    await student.save();
    await Otp.findByIdAndDelete(otp._id);
    response.status(200).json({ message: "Account verified." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to verify password" });
  }
};
