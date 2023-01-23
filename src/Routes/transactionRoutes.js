import { Router } from "express";
import { transactions } from "../Controller/transactionController.js";
import { tokenValidation } from "../Middleware/tokenValidation.js";
import { validateSchema } from "../Middleware/validateSchema.js";
import { transactionSchema } from "../Schemas/transactionSchema.js";

const transactionsRouter = Router();

transactionsRouter.use(tokenValidation);
transactionsRouter.post(
  "/transaction",
  validateSchema(transactionSchema),
  transactions
);

export default transactionsRouter;
