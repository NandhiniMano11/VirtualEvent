const nodemailer = require('nodemailer');
const crypto = require('crypto');
const auth = require('otplib/authenticator');
auth.options = {
    crypto
};

module.exports = function sendInvitation(emailId, callback) {
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
        subject: 'INVITATION!',
        text: "http://www.google.com",
        html: `<p>To join virtual event <a href="http://www.google.com">click here</a></p>`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            let finalData = { status: false, message: error.message }
            return callback(finalData);
        } else {
            let finalData = { status: true, message:"Invitation send successfully"}
            return callback(finalData);
        }
    });
};
