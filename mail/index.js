const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.mailUsername,
    pass: process.env.mailPassword,
  },
});

function sendMail(to, username, pw) {
  transporter.sendMail(
    {
      to,
      subject: "Your IssueTrackingApp account is ready",
      html: `Your username : ${username},
      Your password : ${pw}
      `,
    },
    (err) => {
      if (err) return console.log(err);
      console.log("Successfully sent mail to", to);
    }
  );
}

module.exports = sendMail;
