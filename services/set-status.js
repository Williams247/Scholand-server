const { Student } = require("../models");
const { Profile } = require("./profile");

module.exports = async (studentID, commandStatus) => {
  if (commandStatus === "activate") {
    try {
      const setStudentStatus = await Student.findByIdAndUpdate(studentID);
      setStudentStatus.isActive = true;
      await setStudentStatus.save();
      return await Profile("student", studentID);
    } catch (error) {
      throw error;
    }
  }

  if (commandStatus === "deactivate") {
    try {
      const setStudentStatus = await Student.findByIdAndUpdate(studentID);
      setStudentStatus.isActive = false;
      await setStudentStatus.save();
      return await Profile("student", studentID);
    } catch (error) {
      throw error;
    }
  }
};
