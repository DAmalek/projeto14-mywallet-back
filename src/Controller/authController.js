import { authSchema } from "../Schemas/AuthSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import db from "../Config/database.js";

export async function signUp(req, res) {
  const { name, email, password, Cpassword } = req.body;

  const cryptedPassword = bcrypt.hashSync(password, 10);

  try {
    const userExists = await db.collection("users").findOne({ email });

    if (userExists)
      return res.status(409).send("user already exist, stop trolling!!");

    await db
      .collection("users")
      .insertOne({ name, email, password: cryptedPassword });
    res.status(201).send("user created");
  } catch (error) {
    res.status(422).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userExists = await db.collection("users").findOne({ email });

    if (!userExists)
      return res.status(401).send("check again user or password");

    const passwordExists = bcrypt.compareSync(password, userExists.password);

    if (!passwordExists)
      return res.status(401).send("check again user or password");

    const token = uuidV4();

    await db
      .collection("sessions")
      .insertOne({ user_id: userExists._id, token });

    res.status(202).send(token);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
