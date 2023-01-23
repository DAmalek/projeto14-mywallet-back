import db from "../Config/database.js";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.raplace("Bearer ", "");

  if (!token) return res.status(422).send("token is required");

  try {
    const checkSession = await db.collection("sessions").findOne({ token });

    if (!checkSession) return res.status(401).send("Unauthorized");

    res.locals.session = checkSession;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
