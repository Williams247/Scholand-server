// The send mail generate otp is used to create and update otp records and sends a mail afterwards
const { Student, Otp } = require("../../models/index");
const { sendMail } = require("../../utils/index");
const { random } = require("../../helper/index");

exports.handleSendMailGenerateOTP = userType => async (request, response) => {
    const email = request.body.email;
  // Fires off for student
  if (userType === "student") {
    try {
      const student = await Student.findOne({ email: email });
      if (!student) return response.status(404).json({ error: "Email does not exist." });
      // Generates 4 digits random values
      const randomValue = random(9000);
      // Checks if there is an already existing OTP in the OTP collection and sends a mail
      const checkOtp = await Otp.findOne({ userId: student._id });
      if (checkOtp) {
        const updateOtp = await Otp.findOneAndUpdate({ userId: checkOtp.userId });
        updateOtp.otpCode = randomValue;
        updateOtp.isVerified = false;
        updateOtp.time = new Date().toLocaleString();
        await updateOtp.save();
        const sendMailResponse = await sendMail(email, randomValue, `${student.firstName} ${student.lastName}`);
        return response.status(200).json({ message: sendMailResponse });
      }
      // Creates a new OTP record in the OTP collection and sends a mail
      const otp = new Otp({
        userId: student._id,
        email: email,
        otpCode: randomValue,
        isVerified: false,
        time: new Date().toLocaleString()
      });
      await otp.save();
      const sendMailResponse = await sendMail(email, randomValue, `${student.firstName} ${student.lastName}`);
      return sendMailResponse;
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to send mail." })
    }
  }
  // Fires off for admin
  if (userType === "admin") {
    try {
      const student = await Student.findOne({ email: email });
      if (!student) return response.status(404).json({ error: "Email does not exist." });
      // Generates 4 digits random values
      const randomValue = random(9000);
      // Checks if there is an already existing OTP in the OTP collection and sends a mail
      const checkOtp = await Otp.findOne({ userId: student._id });
      if (checkOtp) {
        const updateOtp = await Otp.findOneAndUpdate({ userId: checkOtp.userId });
        updateOtp.otpCode = randomValue;
        updateOtp.isVerified = false;
        updateOtp.time = new Date().toLocaleString();
        await updateOtp.save();
        const sendMailResponse = await sendMail(email, randomValue, `${student.firstName} ${student.lastName}`);
        return response.status(200).json({ message: sendMailResponse });
      }
      // Creates a new OTP record in the OTP collection and sends a mail
      const otp = new Otp({
        userId: student._id,
        email: email,
        otpCode: randomValue,
        isVerified: false,
        time: new Date().toLocaleString()
      });
      await otp.save();
      const sendMailResponse = await sendMail(email, randomValue, `${student.firstName} ${student.lastName}`);
      return response.status(200).json({ message: sendMailResponse });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to send mail." })
    }
  }
};
