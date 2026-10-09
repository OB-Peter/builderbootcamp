import crypto from "crypto";

export function verifyWebhook(req, res, next) {
  const payload = req.rawBody ? req.rawBody : JSON.stringify(req.body);
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(payload)
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Invalid signature");
  }

  next();
}
