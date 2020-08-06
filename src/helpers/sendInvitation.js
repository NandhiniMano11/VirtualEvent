const nodemailer = require('nodemailer');
const httpStatus = require('http-status');
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
   const link = postData.link ? postData.link : '';
    var mailOptions = {
        from: 'testkit62@gmail.com',
        to: emailId,
        subject: 'INVITATION!',
        text: link,
        html: `<p>To join virtual event <a href="${link}">click here</a></p>`,
               
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return {status: false, message: error}
        
        } else {
            return {status: true, message:"Invitation successfully sent"}
        }
    });

};
