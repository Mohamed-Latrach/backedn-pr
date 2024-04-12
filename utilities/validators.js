import Joi from 'joi';


const registerValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  gender: Joi.string().valid('male', 'female'),
  birthday: Joi.date().max('now')
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
    password: Joi.string().required()
})

export { registerValidator, loginValidator };
