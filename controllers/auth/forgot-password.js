exports.handleForgotPassword = async (request, response, next) => {
  try {
    // Request body for email
    const email = request.body.email;
    // Failed
    if (!email) return response.status(400).json({ error: "Enter your email." });
    // Passed
    return next();
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Forgot password failed." });
  }
};
