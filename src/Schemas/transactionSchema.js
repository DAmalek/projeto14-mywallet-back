import joi from "joi";

export const transactionSchema = joi.object({
  user_id: joi.object().required(),
  value: joi.number().required().min(1),
  description: joi.string().min(2).max(30),
  type: joi.string().valid("deposit", "withdraw").required(),
  time: joi.string().required(),
});
