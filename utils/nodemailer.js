const nodemailer = require("nodemailer");

// Create a transporter (using Gmail, SMTP, or other services)
const transporter = nodemailer.createTransport({
	service: "gmail", // Or use 'smtp.mailtrap.io' for testing
	auth: {
		user: process.env.EMAIL_USERNAME, // Replace with your email
		pass: process.env.EMAIL_PASSWORD, // Replace with your email password or App Password
	},
});

const sendMail = (mailOptions) => {
	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error:", error);
		} else {
			console.log("Email sent:", info.response);
		}
	});
};

module.exports = {
	sendMail,
};
