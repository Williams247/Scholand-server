const bcrypt = require("bcryptjs");
const { Student } = require("../../models/index");
const { validateSignUp } = require("../../validations/auth/signup");

exports.handleSignUp = async (request, response, next) => {
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
    if (student) return response.status(409).json({ message: "Email already taken." });
    // Hashes a student password
    const hashPassword = await bcrypt.hash(password, 10);
    // Creates a new student
    const createStudent = new Student({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashPassword
    });
    await createStudent.save();
    return next();
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Registration failed." })
  }
};
