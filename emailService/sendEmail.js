const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_GMAIL_ADDRESS',
    pass: 'YOUR_GMAIL_PASSWORD'
  }
});

exports.sendEmail = async(req, res) => {
try {
// Extract the recipient email address, subject, and message from the request body
    const { to, subject, message } = req.body;

// Send the email using the nodemailer package and the transporter object
    const info = await transporter.sendMail({
    from: 'YOUR_GMAIL_ADDRESS',
    to: to,
    subject: subject,
    text: message
    });

// Return a success message
    res.json({ message: 'Email sent successfully' });
    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending email' });
    }
};