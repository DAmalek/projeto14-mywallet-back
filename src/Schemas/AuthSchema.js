import joi from "joi";

export const authSchema = joi.object({
  name: joi.string().min(2).max(16).required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(3).max(16),
  Cpassword: joi.string().required().valid(joi.ref("password")),
});

export const LoginSchema = joi.object({
  email: joi.string().email().max(18).required(),
  password: joi.string().max(18).required(),
});
