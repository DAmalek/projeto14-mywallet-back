import { func } from "joi";
import db from "../Config/database";

export async function transactions(req, res) {
  const { value, description, type } = req.body;
  const { user_id } = req.locals.session;

  const model = {
    user_id,
    value,
    description,
    type,
  };

  try {
    await db.collection("transactions").insertOne(model);

    console.log("transação feita com sucesso: ", model);

    res.status(201).send("transaction successful");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function bankStatement(req, res) {
  const { user_id } = req.locals.session;

  try {
    const transactionList = await db
      .collection("transactions")
      .findMany({ user_id })
      .toArray();

    console.log(transactionList);

    res.status(202).send(transactionList);
  } catch (error) {
    res.status(500).send(error);
  }
}
