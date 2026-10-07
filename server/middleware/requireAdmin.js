import crypto from "crypto";

// Protects admin-only routes. Clients must send the header:  x-admin-key: <ADMIN_API_KEY>
// Generate a key with:  openssl rand -hex 32   and set ADMIN_API_KEY on Render.
export function requireAdmin(req, res, next) {
  const expected = Buffer.from(process.env.ADMIN_API_KEY || "");
  const provided = Buffer.from(String(req.headers["x-admin-key"] || ""));

  if (
    expected.length === 0 ||
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
