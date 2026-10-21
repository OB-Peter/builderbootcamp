import pool from "../config/db.js";

export const Transaction = {
  async create({ student_id, reference, amount_kobo, status, raw_response }) {
    const { rows } = await pool.query(
      `INSERT INTO transactions (student_id, reference, amount_kobo, status, raw_response)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (reference) DO UPDATE
         SET status = EXCLUDED.status,
             raw_response = EXCLUDED.raw_response
       RETURNING id`,
      [student_id, reference, amount_kobo, status, JSON.stringify(raw_response)]
    );
    return { id: rows[0].id };
  },

  async findAll() {
    const { rows } = await pool.query(
      `SELECT t.id, t.student_id, t.reference, t.amount_kobo, t.status, t.created_at,
              s.full_name, s.email, c.name AS course_name
       FROM transactions t
       LEFT JOIN students s ON s.id = t.student_id
       LEFT JOIN courses c ON c.id = s.course_id
       ORDER BY t.created_at DESC`
    );
    return rows;
  },
};