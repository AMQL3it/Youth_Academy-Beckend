const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);

exports.sendSMS = async(req, res) => {
try {
    // Extract the mobile number and message from the request body
    const { to, message } = req.body;

    // Send the SMS message using the Twilio API
    const result = await client.messages.create({
        body: message,
        from: 'YOUR_TWILIO_PHONE_NUMBER',
        to: to
    });

    // Return a success message
    res.json({ message: 'SMS sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending SMS' });
    }
};