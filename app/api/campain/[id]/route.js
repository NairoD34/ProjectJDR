import sqlite from 'better-sqlite3';


const db = sqlite('jdr.db');
export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        db.prepare('DELETE FROM campain WHERE id = ?').run(id);
        return new Response('Campain deleted', { status: 200 });
    } catch (error) {
        console.error('Erreur suppression campagne :', error);
        return new Response('Erreur serveur', { status: 500 });
    }
}
export async function GET(request, {params}) {
    const { id } = params;

    const stmt = db.prepare('SELECT * FROM campain WHERE id = ?');
    const data = stmt.all(id);

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}