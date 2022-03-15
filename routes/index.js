const app = require("express")();

app.use(require("./auth/forgot-password"));
app.use(require("./auth/login"));
app.use(require("./auth/resend-otp"));
app.use(require("./auth/reset-password"));
app.use(require("./auth/signup"));
app.use(require("./auth/verify-account"));
app.use(require("./auth/verify-otp"));
app.use(require("./student/profile"));

module.exports = app;
