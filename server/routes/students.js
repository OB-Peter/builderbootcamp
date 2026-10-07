import express from "express";
import { listCourses, listStudents } from "../controllers/studentController.js";
import { requireAdmin } from "../middleware/requireAdmin.js"; // new

const router = express.Router();

router.get("/courses", listCourses);
router.get("/", requireAdmin, listStudents); // admin use — consider auth-protecting this

export default router;
