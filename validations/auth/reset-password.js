const Joi = require("joi");

exports.validateResetPassword = data => {
  const schema = Joi.object({
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    password: Joi.string().required(),
    confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .error(new Error('Passwords does not match.'))
  });
  return schema.validate(data)
};
