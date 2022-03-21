const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { mailSentMessage } = require("../../constants/index")

module.exports = (mail, otp, username, subject) => {
  const filePath = path.join(__dirname, '..', 'email/mail-template.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);

  const replacement = {
    username: username,
    otp: otp
  };

  const mailTemplate = template(replacement);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAIL,
      pass: process.env.NODE_MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: "Scholand",
    to: mail,
    subject: subject,
    html: mailTemplate
  };

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve(mailSentMessage)
      }
    });
  });
};
