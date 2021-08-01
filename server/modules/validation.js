const Joi = require("Joi");

exports.registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(4)
            .required(),
        password: Joi.string()
            .min(6)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
    });
    return schema.validate(data);
};
exports.loginValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string()
            .min(6)
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        email: Joi.string()
            .min(6)
            .email()
            .required(),
    });
    return schema.validate(data)
};