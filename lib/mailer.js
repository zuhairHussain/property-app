const nodemailer = require('nodemailer');
var config = require("../config");
const { ErrorHandler } = require('../lib/errorHandler');

var transport = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    auth: {
        user: config.smtp_user,
        pass: config.smtp_pass
    }
});

async function sendMail({ to, subject, html, from = config.email_from }){
    await transport.sendMail({ from, to, subject, html });
}

async function sendVerificationEmail(account) {
    try {
        const verifyUrl = `${config.base_url}/account/verify-email?token=${account.verificationToken}`;
        let message = `<p>Please click the below link to verify your email address:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    
        await sendMail({
            to: account.email,
            subject: 'Sign-up Verification - Verify Email',
            html: `<h4>Verify Email</h4>
            <p>Thanks for registering!</p>
            ${message}`
        });
    } catch(err) {
        throw new ErrorHandler(500, "Something went wrong please try again!");
    }
}
async function sendResetPasswordEmail(user) {
    try {
        const resetUrl = `${config.base_url}/reset-password?token=${user.token}`;
        let message = `<p>To reset your password click on the link</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    
        await sendMail({
            to: user.email,
            subject: 'Password Reset',
            html: `${message}`
        });
    } catch(err) {
        throw new ErrorHandler(500, "Something went wrong please try again!");
    }
}

module.exports = {
    sendMail,
    sendVerificationEmail,
    sendResetPasswordEmail
}
