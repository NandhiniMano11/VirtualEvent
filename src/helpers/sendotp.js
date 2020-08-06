const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
const crypto = require('crypto');
const auth = require('otplib/authenticator');
auth.options = {
    crypto
};


module.exports = function sendOTP(emailId, callback) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testkit62',
            pass: '12345!@kit'
        }
    });
    var date = new Date()
    const ttl      = 5 * 60 * 1000; //5 Minutes in miliseconds
    const expires  = Date.now() + ttl; //timestamp to 5 minutes in the future
    const secret = JSON.stringify(date.getMilliseconds())
    const otp = auth.generate(secret);

    var mailOptions = {
        from: 'testkit62@gmail.com',
        to: emailId,
        subject: 'Verification',
        text: otp,
        html: `<b><h2>${otp} </h2></b> <br> is your SECRET One Time Password (OTP) to register. Do not share it with anyone.`
    };

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            let finalData = { status: false, message: error.message }
            return callback(finalData);
        } else {
            let finalData = { status: true, otp_value: otp ,expires :expires}
            return callback(finalData);
        }
    });
};
