import Joi from 'joi';

export const registerValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  gender: Joi.string().valid('male', 'female'),
  birthday: Joi.date().max('now')
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
