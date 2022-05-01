const bcrypt = require("bcryptjs");
const { Student, Admin } = require("../../models");
const { validateSignUp } = require("../../validations/auth/signup");
const { mailTaken } = require("../../constants");
const { random } = require("../../helper")

exports.handleSignUp = ({ signUpAs }) => async (request, response, next) => {
  if (signUpAs === "student") {
    try {
      // Request bodies
      const { body: { firstName, lastName, phoneNumber, email, password }, query: { refareralCode } } = request;
      // Input validations
      const validateUserSignUp = validateSignUp(request.body);
      if (validateUserSignUp.error) {
        return response.status(400).json({ error: validateUserSignUp.error.message });
      }

      if (refareralCode) {
        const studentWithReferal = await Student.findOne({ refareralCode: refareralCode });
        if (!studentWithReferal) return response.status(400).json({ error: "Invalid referal code." });
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
        role: signUpAs,
        refareralCode: random(9000)
      });
      const newStudent = await createStudent.save();
      if (refareralCode) {
        const studentWithReferal2 = await Student.findOne({ refareralCode: refareralCode }).populate("refered");
        if (studentWithReferal2.refered.length === 20) {
          if (studentWithReferal2.refered.filter(i => i.verified === true).length === 5) {
            const findStudent = await Student.findOne({ refareralCode: refareralCode });
            if (findStudent.paid === false) {
              findStudent.paid = true;
              await findStudent.save()
            }
          }
        }
        const studentToGetReferal = await Student.findOne({ refareralCode: Number(refareralCode) });
        const addReferedStudent = await Student.findByIdAndUpdate(studentToGetReferal._id)
        addReferedStudent.refered.push(newStudent)
        await addReferedStudent.save();
        return next();
      }
      return next();
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Registration failed." });
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
      response.status(500).json({ error: "Registration failed." });
    }
  }
};
