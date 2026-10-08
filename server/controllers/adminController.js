import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = (req, res) => {
  const { email, password } = req.body || {};

  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const hash = (process.env.ADMIN_PASSWORD_HASH || "").trim();
  const emailOk = String(email || "").trim().toLowerCase() === adminEmail;
  const passOk = hash.length > 0 && bcrypt.compareSync(String(password || ""), hash);

  console.log("login check:", {
    emailSet: adminEmail.length > 0,
    emailLen: (process.env.ADMIN_EMAIL || "").length, // expect 24
    emailOk,
    hashLen: hash.length,                             // expect 60
    passOk,
  });

  if (!emailOk || !passOk) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ role: "admin", email: adminEmail }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
};