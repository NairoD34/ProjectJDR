import sqlite from 'better-sqlite3';


const db = sqlite('jdr.db');
export async function DELETE(request, {params}) {
    const id = parseInt(params.id);
    db.prepare('DELETE FROM campain WHERE id = ?').run(id);
    return new Response('Campain deleted', { status: 200 });
}