import pool from "../config/db.js";

export const Course = {
  async findAll() {
    const { rows } = await pool.query("SELECT * FROM courses");
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
    return rows[0] || null;
  },
};