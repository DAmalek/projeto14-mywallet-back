import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient;
} catch (error) {
  console.log("deu ruim no server  ", error);
}

const authSchema = joi.object({
  name: joi.string().min(2).max(16).required(),
  email: joi.string().email().required(),
  password: joi.string().required().min(3).max(16),
  Cpassword: joi.string().required().valid(joi.ref("password")),
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signUp", async (req, res) => {
  const { name, email, password, Cpassword } = req.body;

  const { error } = authSchema.validate(
    { name, email, password, Cpassword },
    { abortEarly: false }
  );

  if (error) {
    const errorMsg = error.details.map((er) => er.message);
    res.status(422).send(errorMsg);
  }

  const cryptedPassword = bcrypt.hashSync(password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: cryptedPassword });
    res.status(201).send("user created");
  } catch (error) {
    res.status(422).send(error.message);
  }
});

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await db.collection("users").findOne({ email });

    if (!userExists)
      return res.status(401).send("check again user or password");

    const passwordExists = bcrypt.compare(password, userExists.password);

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
});

app.listen(4009, () => {
  console.log("servidor rodando a todo vapor!!");
});
