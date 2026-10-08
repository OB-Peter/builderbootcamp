import crypto from "crypto";
import jwt from "jsonwebtoken";

function validKey(req) {
  const expected = Buffer.from(process.env.ADMIN_API_KEY || "");
  const provided = Buffer.from(String(req.headers["x-admin-key"] || ""));
  return (
    expected.length > 0 &&
    provided.length === expected.length &&
    crypto.timingSafeEqual(provided, expected)
  );
}

export function requireAdmin(req, res, next) {
  // 1. Bearer JWT (the Angular admin app)
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.role === "admin") {
        req.admin = payload;
        return next();
      }
    } catch {}
  }
  // 2. Static key (curl / scripts), the existing behaviour
  if (validKey(req)) return next();

  return res.status(401).json({ error: "Unauthorized" });
}