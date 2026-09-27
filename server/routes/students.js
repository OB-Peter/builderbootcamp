import express from "express";
import { listCourses, listStudents } from "../controllers/studentController.js";

const router = express.Router();

router.get("/courses", listCourses);
router.get("/", listStudents); // admin use — consider auth-protecting this

export default router;
