const { Login } = require("../../services/index");

exports.handleLogin = async (request, response) => {
  const { body: { email, password } } = request;
  try {
    const loginResponse = await Login(email, password, "student");
    return response.status(200).json(loginResponse);
  } catch (error) {
    response.status(error.status).json({ error: error.message })
  }
};
