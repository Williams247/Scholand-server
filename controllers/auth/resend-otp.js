const { Otp, Student, Admin } = require("../../models");
const { sendMail } = require("../../utils");
const { resendOTPMessage, emptyEmail, invalidEmail } = require("../../constants");

exports.handleResendOTP = ({ resendOtpTo, mailSubject }) => async (request, response) => {
  if (resendOtpTo === "student") {
    try {
      const email = request.body.email;
      if (!email) return response.status(400).json({ error: emptyEmail });
      const student = await Student.findOne({ email: email });
      if (!student) return response.status(400).json({ error: invalidEmail });
      const otp = await Otp.findOne({ email: email });
      if (!otp) return response.status(404).json({ error: "There is no OTP to resend." });
      const updateExpiryTime = await Otp.findByIdAndUpdate(otp._id)
      updateExpiryTime.time = new Date().toLocaleString();
      await updateExpiryTime.save();
      await sendMail(email, otp.otpCode, `${student.firstName} ${student.lastName}`, mailSubject);
      response.status(200).json({ message: resendOTPMessage });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to resend OTP." });
    }
  }
  if (resendOtpTo === "admin") {
    try {
      const email = request.body.email;
      if (!email) return response.status(400).json({ error: emptyEmail });
      const admin = await Admin.findOne({ email: email });
      if (!admin) return response.status(400).json({ error: invalidEmail });
      const otp = await Otp.findOne({ email: email });
      if (!otp) return response.status(404).json({ error: "There is no OTP to resend." });
      const updateExpiryTime = await Otp.findByIdAndUpdate(otp._id)
      updateExpiryTime.time = new Date().toLocaleString();
      await updateExpiryTime.save();
      await sendMail(email, otp.otpCode, `${admin.firstName} ${admin.lastName}`, mailSubject);
      response.status(200).json({ message: resendOTPMessage });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to resend OTP." });
    }
  }
};
