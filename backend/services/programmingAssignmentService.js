import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM programming_assignments;`;
};

const findOne = async (id) => {
  const assignment = await sql`SELECT * FROM programming_assignments WHERE id = ${id}`
  if (!assignment[0]) return ("Not found", { status: 404 })
  return assignment[0]
}

export { findOne, findAll };
