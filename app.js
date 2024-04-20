const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { name, email, course } = req.body;
    console.log(`Received registration from ${name}`);

    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use any SMTP service you prefer
        auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'info@ribhusanyal.in',
        to: email, // Send email to the registrant
        subject: `Registration for ${course}`,
        text: `Hi ${name},\n\nYou have successfully registered for the ${course}. We will contact you with more details soon.\n\nBest regards,\nYour Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.send('Registration successful, email sent!');
    } catch (error) {
        console.error('Failed to send email', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
