const Joi = require("joi");
const schema =  Joi.object({
        Id: Joi.string().min(3).required()
    });

    module.exports = {schema};