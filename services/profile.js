const { Student, Admin } = require("../models/index");

module.exports = async (userType, id, removeProp) => {
  try {
    if (userType === "student" && removeProp) return Student.findById(id).select(`-${removeProp}`);
    if (userType === "student") return await Student.findById(id);
    if (userType === "admin" && removeProp) return await Admin.findById(id).select(`-${removeProp}`);
    if (userType === "admin") return await Admin.findById(id);
  } catch (error) {
    throw error;
  }
};
