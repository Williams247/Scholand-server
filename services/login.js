// This login service works for student first time signup, admin first time signup and normal login for stident and admin
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Student } = require("../models/index");
const { validateLogin } = require("../validations/auth/login");

module.exports = async (email, password, userType) => {
  if (userType === "student") {
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
      if (!student) throw {
        status: 404,
        message: "Email is incorrect."
      }

      const validatedPassword = await bcrypt.compare(password, student.password);
      if (!validatedPassword) throw {
        status: 404,
        message: "Password is incorrect."
      }
      // Success
      const payload = {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber
      };
      
      const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });
      return {
        message: "You are now logged in.",
          result: {
            token: token,
            data: payload
          }
        }
      } catch (error) {
      throw error
    }
  } else {
    // Admin login
  }
};
