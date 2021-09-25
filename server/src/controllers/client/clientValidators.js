const Joi = require('joi');

exports.SendDetailsValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().required(),

    age: Joi.number().positive().min(3).max(120),
  });

  const { firstName, lastName, email, age } = req.body;
  const payload = {
    firstName,
    lastName,
    email,
    age,
  };
  const joiResponse = schema.validate(payload);
  if (joiResponse.error) {
    res.status(400).json(joiResponse);
    return;
  }

  next();
};
