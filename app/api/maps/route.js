import { NextResponse } from 'next/server';
import sqlite3 from 'better-sqlite3';
import { open } from 'better-sqlite3';

export async function GET() {
    try {
        const db = await open({
            filename: './jdr.db',
            driver: sqlite3.Database
        });

        const maps = await db.all('SELECT * FROM maps');
        await db.close();

        return NextResponse.json(maps);
    } catch (error) {
        console.error('Error fetching maps:', error);
        return NextResponse.json({ error: 'Failed to fetch maps' }, { status: 500 });
    }
}
