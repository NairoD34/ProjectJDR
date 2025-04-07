import sqlite from 'better-sqlite3';


const db = sqlite('jdr.db');

export async function GET() {
    const data = db.prepare('SELECT * FROM campain').all();
    return Response.json(data);
}