const { Student } = require("../../models");
const { Profile } = require("../../services");

// Route to get students
exports.handleGetStudents = async (request, response) => {
  try {
    const students = await Student.find().select("-password");
    response.status(200).json({
      message: "Success.",
      results: students
    })
  } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Failed to fetch students." });
  }
};

// Route to get a student by ID
exports.handleGetStudent = async (request, response) => {
  try {
    const { params: { id } } = request;
    if (!id) return response.status(404).json({ error: "Provide an ID." });
    const student = await Profile("student", id, "password");
    response.status(200).json({
      message: "Success.",
      results: student
    })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to fetch student." });
  }
};
