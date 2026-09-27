import pool from "../config/db.js";

export const Transaction = {
  async create({ student_id, reference, amount_kobo, status, raw_response }) {
    const [result] = await pool.query(
      `INSERT INTO transactions (student_id, reference, amount_kobo, status, raw_response)
       VALUES (?, ?, ?, ?, ?)`,
      [student_id, reference, amount_kobo, status, JSON.stringify(raw_response)]
    );
    return { id: result.insertId };
  },

  async findAll() {
    const [rows] = await pool.query(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );
    return rows;
  },
};
