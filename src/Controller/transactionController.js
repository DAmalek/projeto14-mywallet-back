import db from "../Config/database.js";

export async function transactions(req, res) {
  const { value, description, type } = req.body;
  const transactionModel = res.locals.transaction;

  try {
    await db.collection("transactions").insertOne(transactionModel);

    console.log("transação feita com sucesso: ", transactionModel);

    res.status(201).send("transaction successful");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function bankStatement(req, res) {
  const user = res.locals.session;

  try {
    const transactionList = await db
      .collection("transactions")
      .find({ user_id: user._id })
      .toArray();
    delete user.password;
    console.log(transactionList);

    res.status(202).send({ transactionList, user });
  } catch (error) {
    res.status(500).send(error);
  }
}
