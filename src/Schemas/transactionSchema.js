import joi from "joi";

export const transactionSchema = joi.object({
  value: joi.number().required().min(1),
  description: joi.string().min(2).max(30),
  type: joi.string().valid("deposit", "withdraw").required(),
});
