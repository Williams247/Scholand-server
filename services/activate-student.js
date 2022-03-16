const { Student } = require("../models/index");
const { Profile } = require("./index");

module.exports = async studentID => {
  try {
    const activateStudent = await Student.findByIdAndUpdate(studentID);
    activateStudent.isActive = true;
    await activateStudent.save();
    return await Profile("student", studentID);
  } catch (error) {
    throw error;
  }
};
