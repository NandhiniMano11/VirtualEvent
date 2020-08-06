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
    var mailOptions = {
        from: 'testkit62@gmail.com',
        to: emailId,
        subject: 'INVITATION!',
        text: "http://www.google.com",
        html: `<p>To join virtual event <a href="http://www.google.com">click here</a></p>`,
               
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return {status: false, message: error}
        
        } else {
            return {status: true, message:"Invitation successfully sent"}
        }
    });

};
