const app = require("express")();

// Student route
app.use(require("./student/profile"));
app.use(require("./student/payment"));
app.use(require("./student/questions"));

// Admin route
app.use(require("./admin/questions"));

// Auth routes for student and admin
app.use(require("./auth/forgot-password"));
app.use(require("./auth/login"));
app.use(require("./auth/resend-otp"));
app.use(require("./auth/reset-password"));
app.use(require("./auth/signup"));
app.use(require("./auth/verify-account"));
app.use(require("./auth/verify-otp"));

module.exports = app;
