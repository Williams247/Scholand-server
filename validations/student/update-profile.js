const Joi = require("joi");

exports.validateUpdateProfile = data => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(25),
    lastName: Joi.string().required().min(3).max(25),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    phoneNumber: Joi.number().required()
  });
  return schema.validate(data)
};
