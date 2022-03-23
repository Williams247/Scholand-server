// Login controller for student and admin
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Student, Admin } = require("../../models/index");
const { validateLogin } = require("../../validations/auth/login");
const { mailSentMessage } = require("../../constants/index");

exports.handleLogin = ({ loginAs, withSignUp }) => async (request, response) => {
  const { body: { email, password } } = request;
  if (loginAs === "student") {
    // Student login
    try {
      // Error validation
      const validateUserLogin = validateLogin({
        email: email,
        password: password
      });
      if (validateUserLogin.error) {
        return response.status(400).json({ error: validateUserLogin.error.message });
      }
      // Wrong email and password check
      const student = await Student.findOne({ email: email });
      if (!student) return response.status(404).json({ error: "Email is incorrect." });

      const validatedPassword = await bcrypt.compare(password, student.password);
      if (!validatedPassword) return response.status(404).json({ error: "Password is incorrect." });

      // Success
      const payload = {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
        role: student.role
      };
      
      const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 * 7 });
      return response.status(200).json({
        message: `${withSignUp ? `Registered, ${mailSentMessage}` : 'You are now logged in.' }`,
          result: {
            token: token,
            data: payload
          }
        })
      } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to login." })
    }
  }

  if (loginAs === "admin") {
    // Admin
    try {
      // Error validation
      const validateAdminLogin = validateLogin({
        email: email,
        password: password
      });
      if (validateAdminLogin.error) {
        return response.status(400).json({ error: validateAdminLogin.error.message });
      }
      // Wrong email and password check
      const admin = await Admin.findOne({ email: email });
      if (!admin) return response.status(404).json({ error: "Email is incorrect." });

      const validatedPassword = await bcrypt.compare(password, admin.password);
      if (!validatedPassword) return response.status(404).json({ error: "Password is incorrect." });

      // Success
      const payload = {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role
      };
      
      const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 * 7 });
      return response.status(200).json({
        message: "You are logged in.",
          result: {
            token: token,
            data: payload
          }
        })
      } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to login." })
    }
  }
};
