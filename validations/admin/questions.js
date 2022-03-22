const Joi = require("joi");

exports.validateQuestion = data => {
  const schema = Joi.object({
    title: Joi.string().required().min(2).max(25),
    adminQuestion: Joi.string().required(),
    cutOffMark: Joi.number().required(),
    options: Joi.object().required().min(4).max(4).keys({
      optionA: Joi.object().keys({
        title: Joi.string().required()
        .error(new Error('Title for option A is required.')),
        value: Joi.boolean().required()
        .error(new Error('Value for option A is required.'))
      }),
      optionB: Joi.object().keys({
        title: Joi.string().required()
        .error(new Error('Title for option B is required.')),
        value: Joi.boolean().required()
        .error(new Error('Value for option B is required.'))
      }),
      optionC: Joi.object().keys({
        title: Joi.string().required()
        .error(new Error('Title for option C is required.')),
        value: Joi.boolean().required()
        .error(new Error('Value for option C is required.'))
      }),
      optionD: Joi.object().keys({
        title: Joi.string().required()
        .error(new Error('Title for option D is required.')),
        value: Joi.boolean().required()
        .error(new Error('Value for option D is required.'))
      }),
    }).error(new Error("Required options should be 4 only."))
  });
  return schema.validate(data)
};
