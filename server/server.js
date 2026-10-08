import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payments.js";
import studentRoutes from "./routes/students.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  "http://localhost:4200", // Angular dev server (remove if you don't need it in production)
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "BuilderBootcamp API is running" });
});

app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BuilderBootcamp server running on port ${PORT}`);
});