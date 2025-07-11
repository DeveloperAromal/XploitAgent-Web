import { verifyJwtToken } from "../utils/jwt.js";

export const Protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token missings" });
  }
  try {
    const token = authHeader.split(" ")[1];
    req.user = verifyJwtToken(token);
    next();
  } catch (e) {
    console.log(e);
  }
};
