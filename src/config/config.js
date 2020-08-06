const Joi = require("joi");

require("dotenv").config()

const envVarsSchemas = Joi.object({
        NODE_ENV: Joi.string()
            .allow("development","local")
            .default("local"),
        PORT: Joi.number().default(3000),
      
    })
    .unknown()
    .required();

const {
    error,
    value: envVars
} = envVarsSchemas.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    requestDate: new Date(),
    env: envVars.NODE_ENV,
    port: envVars.PORT,
}

module.exports = config