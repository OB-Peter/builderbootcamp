import express from "express";
import {
  initializePayment,
  verifyPayment,
  handleWebhook,
  getAllTransactions,
} from "../controllers/paymentController.js";
import { verifyWebhook } from "../middleware/verifyPaystackSignature.js";
import { requireAdmin } from "../middleware/requireAdmin.js";   // new
  
const router = express.Router();

router.post("/initialize", initializePayment);
router.get("/verify/:reference", verifyPayment);
router.post("/webhook", verifyWebhook, handleWebhook);
router.get("/transactions", requireAdmin, getAllTransactions);

export default router;
