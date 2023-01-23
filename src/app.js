import express from "express";
import cors from "cors";
import authRouter from "./Routes/authRoutes.js";
import transactionsRouter from "./Routes/transactionRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use([authRouter, transactionsRouter]);

app.listen(5000, () => {
  console.log("servidor rodando a todo vapor!!");
});
