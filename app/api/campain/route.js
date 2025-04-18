import sqlite from 'better-sqlite3';


const db = sqlite('jdr.db');

export async function GET() {
    const data = db.prepare('SELECT * FROM campain').all();
    return Response.json(data);
}

export async function POST(request) {
    const body = await request.json();
    db.prepare('INSERT INTO campain (id, title) VALUES (null, @title)').run(body);
    return new Response('Campain saved', { status: 200 });
}
