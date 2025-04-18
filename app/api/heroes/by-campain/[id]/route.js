import sqlite from "better-sqlite3"; // ou ton chemin vers la base

const db = sqlite('jdr.db');

export async function GET(request, { params }) {
    const {id} = params;

    const stmt = db.prepare('SELECT * FROM hero WHERE id_campain = ?');
    const heroes = stmt.all(id);

    return new Response(JSON.stringify(heroes), {
        headers: {
            'Content-Type': 'application/json',
        },
        status: 200,
    });
}