import pool from "../config/db.js";

export const Student = {
  async create({ full_name, email, phone, school, course_id, reference }) {
    const { rows } = await pool.query(
      `INSERT INTO students (full_name, email, phone, school, course_id, reference, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING id`,
      [full_name, email, phone, school, course_id, reference]
    );
    return { id: rows[0].id, full_name, email, phone, school, course_id, reference };
  },

  async findByReference(reference) {
    const { rows } = await pool.query(
      "SELECT * FROM students WHERE reference = $1",
      [reference]
    );
    return rows[0] || null;
  },

  async updateStatusByReference(reference, status) {
    await pool.query(
      "UPDATE students SET payment_status = $1 WHERE reference = $2",
      [status, reference]
    );
  },

  async findAll() {
    const { rows } = await pool.query(
      `SELECT s.*, c.name AS course_name
       FROM students s
       LEFT JOIN courses c ON s.course_id = c.id
       ORDER BY s.created_at DESC`
    );
    return rows;
  },
};