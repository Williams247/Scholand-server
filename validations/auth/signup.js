const Joi = require("joi");

exports.validateSignUp = data => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(25),
    lastName: Joi.string().required().min(3).max(25),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    phoneNumber: Joi.string(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
    .error(new Error('password does not match.'))
  });
  return schema.validate(data)
};
