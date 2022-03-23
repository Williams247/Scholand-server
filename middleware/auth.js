const jwt = require("jsonwebtoken");
const { unAuthorized } = require("../constants/index");

// Auth middleware for students
exports.AuthStudent = async (request, response, next) => {
  try {
    // Token input
    const token = request.headers["authorization"];
    // Return unauthorized for token that are not passed
    if (!token) return response.status(401).json({ error: unAuthorized });
    // Authorization is granted by JSON web token
    const authorized = await jwt.verify(token, process.env.SECRET);
    // Checks user type
    if (authorized.role !== "student") {
      return response.status(401).json({ error: unAuthorized })
    }
    // Set the results to the request
    request.user = authorized;
    next();
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: error })
  }
};

// Auth middleware for admins
exports.AuthAdmin = async (request, response, next) => {
  try {
    // Token input
    const token = request.headers["authorization"];
    // Return unauthorized for token that are not passed
    if (!token) return response.status(401).json({ error: unAuthorized });
    // Authorization is granted by JSON web token
    const authorized = await jwt.verify(token, process.env.SECRET);
    // Checks user type
    if (authorized.role !== "admin") {
      return response.status(401).json({ error: unAuthorized })
    }
    // Set the results to the request
    request.user = authorized;
    next();
  } catch (error) {
    console.log(error)
    response.status(500).json({ error: error })
  }
};
