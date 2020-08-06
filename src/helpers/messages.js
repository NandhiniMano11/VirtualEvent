const httpStatus = require("http-status");

module.exports={
    required_error: function (bodyValidationResult, res) {
        if (bodyValidationResult.error !== null && bodyValidationResult.error !== undefined) {
            return res.status(httpStatus.BAD_REQUEST).json({
                statusCode: 400,
                status: "Failed",
                msg: bodyValidationResult.error.details[0].message.replace(/[^a-zA-Z ]/g, "")
            });
        }
    },
}