const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        try {
            await transporter.sendMail(mailOptions);
        } catch (err) {
            console.error('Email not sent:', err);
        }
    } else {
        console.log('Email credentials missing, email not sent');
    }
};

module.exports = sendEmail;
