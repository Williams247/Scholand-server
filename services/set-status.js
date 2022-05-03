const { Student } = require("../models");

module.exports = async (studentID, commandStatus) => {
  if (commandStatus === "activate") {
    try {
      const setStudentStatus = await Student.findByIdAndUpdate(studentID);
      setStudentStatus.isActive = true;
      await setStudentStatus.save();
    } catch (error) {
      throw error;
    }
  }

  if (commandStatus === "deactivate") {
    try {
      const setStudentStatus = await Student.findByIdAndUpdate(studentID);
      setStudentStatus.isActive = false;
      await setStudentStatus.save();
    } catch (error) {
      throw error;
    }
  }
};
