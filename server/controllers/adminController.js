import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { email, password } = req.body || {};
  const ok =
    email === process.env.ADMIN_EMAIL &&
    bcrypt.compareSync(String(password || ""), process.env.ADMIN_PASSWORD_HASH || "");
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
};