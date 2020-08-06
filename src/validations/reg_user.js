const Joi = require("joi");
const schema =  Joi.object({
    email: Joi.string().email()
    });

    module.exports = {schema};