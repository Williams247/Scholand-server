const { ActivateStudent } = require("../../services");

exports.handleActivateStudent = async (request, response) => {
  try {
    const {params: { id }} = request;
    if (id) return response.status(400).json({ error: "Provide a valid ID" });
    const activateStudent = await ActivateStudent(id, "activate");
    await activateStudent.save();
    response.status(200).json({ message: "Student Activated." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to activate student." });
  }
};

exports.handleDeactivateStudent = async (request, response) => {
  try {
    const {params: { id }} = request;
    if (id) return response.status(400).json({ error: "Provide a valid ID" });
    const activateStudent = await ActivateStudent(id, "deactivate");
    await activateStudent.save();
    response.status(200).json({ message: "Student Deactivated." });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Failed to deactivate student." });
  }
};
