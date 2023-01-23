import { Router } from "express";
import {
  bankStatement,
  transactions,
} from "../Controller/transactionController.js";
import { tokenValidation } from "../Middleware/tokenValidation.js";
import { transactionValidation } from "../Middleware/transactionValidation.js";
import { validateSchema } from "../Middleware/validateSchema.js";
import { transactionSchema } from "../Schemas/transactionSchema.js";

const transactionsRouter = Router();

transactionsRouter.use(tokenValidation);
transactionsRouter.post("/transaction", transactionValidation, transactions);
transactionsRouter.get("/transaction", bankStatement);

export default transactionsRouter;
