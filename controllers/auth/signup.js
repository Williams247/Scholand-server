const bcrypt = require("bcryptjs");
const { Student, Admin } = require("../../models/index");
const { validateSignUp } = require("../../validations/auth/signup");
const { mailTaken } = require("../../constants/index");

exports.handleSignUp = ({ signUpAs }) => async (request, response, next) => {
  if (signUpAs === "student") {
    try {
      // Request bodies
      const { body: { firstName, lastName, phoneNumber, email, password } } = request;
      // Input validations
      const validateUserSignUp = validateSignUp(request.body);
      if (validateUserSignUp.error) {
        return response.status(400).json({ error: validateUserSignUp.error.message });
      }
      // Checks for registered students
      const student = await Student.findOne({ email: email });
      const admin = await Admin.findOne({ email: email });
      if (student || admin) return response.status(409).json({ error: mailTaken });
      // Hashes a student password
      const hashPassword = await bcrypt.hash(password, 10);
      // Creates a new student
      const createStudent = new Student({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: hashPassword,
        role: signUpAs
      });
      await createStudent.save();
      return next();
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Registration failed." })
    }
  }
  if (signUpAs === "admin") {
    try {
      // Request bodies
      const { body: { firstName, lastName, email, password } } = request;
      // Input validations
      const validateAdminSignUp = validateSignUp(request.body);
      if (validateAdminSignUp.error) {
        return response.status(400).json({ error: validateAdminSignUp.error.message });
      }
      // Checks for registered students
      const admin = await Admin.findOne({ email: email });
      const student = await Student.findOne({ email: email });
      if (admin || student) return response.status(409).json({ error: mailTaken });
      // Hashes a student password
      const hashPassword = await bcrypt.hash(password, 10);
      // Creates a new student
      const createAdmin = new Admin({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        role: signUpAs
      });
      await createAdmin.save();
      return next();
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Registration failed." })
    }
  }
};
