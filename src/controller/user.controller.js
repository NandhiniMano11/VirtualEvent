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
       const update_user = async (req, res, next) => {
        try {
            const postData = req.body;
            const value = { Id: postData.Id }
            const bodyValidationResult = idValidate.schema.validate(value)
            messagehlp.required_error(bodyValidationResult, res);
            await user.findById(postData.Id).then(async (userdata) => {
                if (userdata) {
                    await user.updateOne({ _id: postData.Id }, postData).then((updated) => {
                        return res
                            .status(httpStatus.OK)
                            .json({ status: true, message: 'success' });
                    }).catch((err) => {
                        return res
                            .status(httpStatus.INTERNAL_SERVER_ERROR)
                            .json({ status: false, message: 'Update failed', error: err });
                    })
                } else {
                    return res
                        .status(httpStatus.BAD_REQUEST)
                        .json({ status: false, message: "Invalid request" });
                }
            }).catch((err) => {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ status: false, message: 'failed', error: err })
            })

        }
        catch (err) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, message: err });
        }

    }
    const getuserbyId = async (req, res, next) => {
        try {
            const postData = req.body;
            const value = { Id: postData.Id }
            postData.role = postData.role ? postData.role : 2
            const bodyValidationResult = idValidate.schema.validate(value)
            messagehlp.required_error(bodyValidationResult, res);
            await user.findById(postData.Id).then((userData) => {
                if (userData === null) { return res.status(httpStatus.NOT_FOUND).json({ status: true, message: "User not found" }) }
                else { return res.status(httpStatus.OK).json({ status: true, responseContent: userData }) }
            })
        } catch (err) {
            console.log(err);
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ status: false, message: err });
        }

    }
    // --------------------------------------------return----------------------------------
    return {
        update_user,
        getuserbyId
    };
};


module.exports = userController();