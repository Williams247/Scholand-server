const bcrypt = require("bcryptjs");
const { Student, Otp } = require("../../models/index");
const { SendMailGenerateOTP } = require("../../services/index")
const { validateSignUp } = require("../../validations/auth/signup");
const { Login } = require("../../services/index");

exports.handleSignUp = async (request, response) => {
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
    
    const sendMailResponse = await SendMailGenerateOTP(email);

    // Logs in a student
    const loginResponse = await Login(email, password, "student");
    return response.status(200).json({
      signedUp: `Registered, ${sendMailResponse}`,
      loggedIn: loginResponse
    });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Registration failed." })
  }
};
