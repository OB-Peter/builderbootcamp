import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoutes from "./routes/payments.js";
import studentRoutes from "./routes/students.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "BuilderBootcamp API is running" });
});

app.use("/api/payments", paymentRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`BuilderBootcamp server running on port ${PORT}`);
});
