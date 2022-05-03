const { Student } = require("../models");
const { Profile } = require("./profile");

module.exports = async (studentID, commandStatus) => {
  if (commandStatus === "activate") {
    try {
      const activateStudent = await Student.findByIdAndUpdate(studentID);
      activateStudent.isActive = true;
      await activateStudent.save();
      return await Profile("student", studentID);
    } catch (error) {
      throw error;
    }
  }

  if (commandStatus === "deactivate") {
    try {
      const activateStudent = await Student.findByIdAndUpdate(studentID);
      activateStudent.isActive = false;
      await activateStudent.save();
      return await Profile("student", studentID);
    } catch (error) {
      throw error;
    }
  }
};
