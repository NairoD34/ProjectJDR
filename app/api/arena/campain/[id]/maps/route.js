
import sqlite from 'better-sqlite3';

const db = sqlite('jdr.db');

export async function GET(request, { params }) {
  const { id } = params;

  const stmt = db.prepare('SELECT * FROM maps WHERE id_campain = ?');
  const data = stmt.all(id); // .all() et non .getAll()

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}