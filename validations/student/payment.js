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

exports.validateTransfer = data => {
  const schema = Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    account_number: Joi.number().required(),
    bank_code: Joi.string().required(),
    currency: Joi.string().required()
  });
  return schema.validate(data)
};
