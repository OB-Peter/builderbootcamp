import pool from "../config/db.js";

export const Student = {
  async create({ full_name, email, phone, school, course_id, reference }) {
    const [result] = await pool.query(
      `INSERT INTO students (full_name, email, phone, school, course_id, reference, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [full_name, email, phone, school, course_id, reference]
    );
    return { id: result.insertId, full_name, email, phone, school, course_id, reference };
  },

  async findByReference(reference) {
    const [rows] = await pool.query(
      "SELECT * FROM students WHERE reference = ?",
      [reference]
    );
    return rows[0] || null;
  },

  async updateStatusByReference(reference, status) {
    await pool.query(
      "UPDATE students SET payment_status = ? WHERE reference = ?",
      [status, reference]
    );
  },

  async findAll() {
    const [rows] = await pool.query(
      `SELECT s.*, c.name AS course_name
       FROM students s
       LEFT JOIN courses c ON s.course_id = c.id
       ORDER BY s.created_at DESC`
    );
    return rows;
  },
};
