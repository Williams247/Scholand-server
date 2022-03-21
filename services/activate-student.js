const { Student } = require("../models/index");
const { Profile } = require("./profile");

module.exports = async (studentID, commandStatus) => {
  try {
    if (commandStatus === "activate") {
      const activateStudent = await Student.findByIdAndUpdate(studentID);
      activateStudent.isActive = true;
      await activateStudent.save();
      return await Profile("student", studentID);
    }
    if (commandStatus === "deactivate") {
      const activateStudent = await Student.findByIdAndUpdate(studentID);
      activateStudent.isActive = false;
      await activateStudent.save();
      return await Profile("student", studentID);
    }
  } catch (error) {
    throw error;
  }
};
