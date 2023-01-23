import db from "../Config/database.js";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(422).send("token is required");

  try {
    const checkSession = await db.collection("sessions").findOne({ token });

    if (!checkSession) return res.status(401).send("Unauthorized");

    const user = await db
      .collection("users")
      .findOne({ _id: checkSession?.user_id });

    if (!user) return res.sendStatus(401);

    console.log(user);

    res.locals.session = user;
  } catch (error) {
    res.status(500).send(error);
  }

  next();
}
