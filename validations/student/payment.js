const Joi = require("joi");

exports.validatePayment = data => {
  const schema = Joi.object({
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
    amount: Joi.number().required()
  });
  return schema.validate(data);
};
