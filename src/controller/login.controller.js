const httpStatus = require('http-status');
const sendOTPhlp = require('../helpers/sendotp');
const messagehlp = require('../helpers/messages.js');
const idValidate = require('../validations/findbyId');
const regvalidate = require('../validations/reg_user');
const loginvalidate = require('../validations/login');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('otplib/authenticator');
const user = require('../models/user');
const otptbl = require('../models/otp');
auth.options = {
    crypto
};
const accessTokenSecret = 'Y$1^@#%^&Q1';

const userController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    /*=============== User API's================*/
    const login_user = async (req, res, next) => {
        try {
            const postData = req.body;
            let value = { email: postData.emailId, password: postData.password };
            const bodyValidationResult = loginvalidate.schema.validate(value)
            messagehlp.required_error(bodyValidationResult, res);
            await user.findOne({ emailId: postData.emailId, password: postData.password,otpverified:true })
                .then((userData) => {
                    if (userData === null) {
                        return res
                            .status(httpStatus.NO_CONTENT)
                            .json({ status: false, message: "Invalid email or password" })
                    } else {
                        const accessToken = jwt.sign({ username: postData.emailId }, accessTokenSecret);
                        return res
                            .status(httpStatus.OK)
                            .json({ status: true, message: "Success", responseContent: userData, token: accessToken })
                    }
                }).catch((err) => {
                    return res
                        .status(httpStatus.INTERNAL_SERVER_ERROR)
                        .json({ status: false, error: err })
                })
        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: 'error', error: err });
        }
    }
    const reg_user = async (req, res, next) => {
        try {
            const postData = req.body;
            let value = { email: postData.emailId };
            const bodyValidationResult = regvalidate.schema.validate(value)
            messagehlp.required_error(bodyValidationResult, res);
            let users = new user(postData);
            if (!users) { return res.status(400).json({ success: false, error: err }) }
            await user.findOne({ emailId: postData.emailId }).then(async (userData) => {
                if (userData === null) {
                    await users.save().then(async (savedUsers) => {
                        sendOTPhlp(postData.emailId, async function (response) {
                            if (response.status) {
                                let OTP = new otptbl({
                                    userid: savedUsers.id,
                                    otp: response.otp_value,
                                    expires: response.expires
                                })
                                await OTP.save().then((savedOtp) => {
                                    return res
                                        .status(httpStatus.OK)
                                        .json({ status: true, message: "OTP send successfully" })
                                })
                            }
                        })
                    })
                } else {
                    let now = Date.now();
                    await otptbl.findOne({ userid: userData.id, otp: postData.otp, status: true })
                        .then(async (otpData) => {
                            if (otpData === null) {
                                return res
                                    .status(httpStatus.BAD_REQUEST)
                                    .json({ status: false, message: "Invalid otp" })
                            }
                            else if (now > parseInt(otpData.expires)) {
                                await otptbl.updateOne({ userid: userData.id }, { status: false })
                                return res
                                    .status(httpStatus.BAD_REQUEST)
                                    .json({ status: false, message: "OTP expired." })
                            } else {
                                await otptbl.updateOne({ userid: userData.id }, { status: false })
                                const accessToken = jwt.sign({ username: postData.emailId }, accessTokenSecret);
                                await user.update({emailId: postData.emailId},{otpverified:true})
                                return res
                                    .status(httpStatus.OK)
                                    .json({ status: true, message: "Logged in successfully", token: accessToken })
                            }
                        })
                }
            })
        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: 'error', error: err });
        }
    }
    // --------------------------------------------return----------------------------------
    return {
        reg_user,
        login_user,
    };
};


module.exports = userController();