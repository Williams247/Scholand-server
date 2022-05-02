const bcrypt = require("bcryptjs");
const { Student } = require("../../models")
const { Profile } = require("../../services");
const { validateUpdateProfile } = require("../../validations/student/update-profile");

exports.handleGetProfile = async (request, response) => {
  try {
    // Find student profile
    const studentProfile = await Profile("student", request.user.id);
    response.status(200).json({
      message: "Success",
      result: studentProfile
   })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to get profile." });
  }
};

exports.handleUpdateProfile = async (request, response) => {
  try {
    // Request body
    const {body: {
      firstName,
      lastName,
      phoneNumber,
      email,
      sex,
      dob,
      studyLevel,
      accountName,
      accountNumber,
      bankName,
      password,
      confirmPassword
    }} = request;
    
    // Error checks or validation
    const validateUserUpdateProfile = validateUpdateProfile({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email
    });

    if (validateUserUpdateProfile.error) return response.status(400).json({
      error: validateUserUpdateProfile.error.message
    });
    
    if (email) {
      const doesMailExist = await Student.findOne({ email: email });
      if (doesMailExist) return response.status(409).json({ error: "Email taken, try another." })
    }
    
    if (password && !confirmPassword) return response.status(400).json({ error: "Passwords does not match" });

    const student = await Student.findByIdAndUpdate(request.user.id);
    let newUserPassword;
    
    // Set password
    if (password && confirmPassword) {
      newUserPassword = await bcrypt.hash(password, 10);
    } else {
      newUserPassword = student.password;
    }

    // Updates profile
    student.firstName = firstName;
    student.lastName = lastName;
    student.phoneNumber = phoneNumber;
    student.email = email;
    student.password = newUserPassword;
    student.sex = `${sex ? sex : ""}`;
    student.dob = `${dob ? dob : ""}`;
    student.studyLevel = `${studyLevel ? studyLevel : ""}`;
    student.accountNumber = accountNumber ? accountNumber : undefined;
    student.accountName  = `${accountName ? accountName : ""}`;
    student.bankName = `${bankName ? bankName : ""}`
    await student.save();
    const studentProfile = await Profile("student", request.user.id);
    response.status(200).json({
      message: "Profile updated.",
      result: studentProfile
   });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not update profile." });
  }
};
