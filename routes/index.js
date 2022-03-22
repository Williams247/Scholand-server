const app = require("express")();

// Student route
app.use("/student", require("./student/profile"));
app.use("/student", require("./student/payment"));
app.use("/student", require("./student/questions"));

// Admin route
app.use("/admin", require("./admin/questions"));

// Auth routes for student and admin
app.use("/auth", require("./auth/forgot-password"));
app.use("/auth", require("./auth/login"));
app.use("/auth", require("./auth/resend-otp"));
app.use("/auth", require("./auth/reset-password"));
app.use("/auth", require("./auth/signup"));
app.use("/auth", require("./auth/verify-account"));
app.use("/auth", require("./auth/verify-otp"));

module.exports = app;
