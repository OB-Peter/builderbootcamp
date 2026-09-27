import express from "express";
import {
  initializePayment,
  verifyPayment,
  handleWebhook,
} from "../controllers/paymentController.js";
import { verifyWebhook } from "../middleware/verifyPaystackSignature.js";

const router = express.Router();

router.post("/initialize", initializePayment);
router.get("/verify/:reference", verifyPayment);
router.post("/webhook", verifyWebhook, handleWebhook);

export default router;
