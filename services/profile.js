const { Student, Admin } = require("../models/index");

module.exports = async (userType, id) => {
  try {
    if (userType === "student") return await Student.findById(id);
    if (userType === "admin") return await Admin.findById(id);
  } catch (error) {
    throw error
  }
};
