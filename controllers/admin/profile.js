const bcrypt = require("bcryptjs");
const { Student } = require("../../models/index")
const { Profile } = require("../../services/index");
const { validateUpdateProfile } = require("../../validations/admin/update-profile");

exports.handleGetProfile = async (request, response) => {
  try {
    // Find admin profile
    const adminProfile = await Profile("admin", request.user.id);
    response.status(200).json({
      message: "Success",
      result: adminProfile
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
    
    if (password && !confirmPassword) return response.status(400).json({ error: "Passwords does not match" });

    const admin = await admin.findByIdAndUpdate(request.user.id);
    let newUserPassword;
    
    // Set password
    if (password && confirmPassword) {
      newUserPassword = await bcrypt.hash(password, 10);
    } else {
      newUserPassword = admin.password;
    }

    // Updates profile
    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.phoneNumber = phoneNumber;
    admin.email = email;
    admin.password = newUserPassword;
    await admin.save();
    const adminProfile = await Profile("admin", request.user.id);
    response.status(200).json({
      message: "Profile updated.",
      result: adminProfile
   });

  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Could not update profile." });
  }
};
