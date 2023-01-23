import dayjs from "dayjs";
import { transactionSchema } from "../Schemas/transactionSchema.js";

export function transactionValidation(req, res, next) {
  const { value, description, type } = req.body;
  const user = res.locals.session;

  const transactionModel = {
    user_id: user._id,
    value,
    description,
    type,
    time: dayjs().format("DD/MM/YYYY"),
  };

  const { error } = transactionSchema.validate(transactionModel, {
    abortEarly: false,
  });

  if (error) {
    const errorMsg = error.details.map((detail) => detail.message);
    return res.status(401).send(errorMsg);
  }

  res.locals.transaction = transactionModel;

  next();
}
