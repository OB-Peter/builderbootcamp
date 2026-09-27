import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";

export async function listCourses(req, res) {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error("listCourses error:", err.message);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
}

export async function listStudents(req, res) {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    console.error("listStudents error:", err.message);
    res.status(500).json({ error: "Failed to fetch students" });
  }
}
