import { S3 } from '@aws-sdk/client-s3';
import sqlite from 'better-sqlite3';

const s3 = new S3({
    region: 'eu-west-3'
});

const db = sqlite('jdr.db');

export function getMaps(campainId){
    return db.prepare('SELECT * FROM maps WHERE id_campain = ?').get(campainId);
}

export async function saveMap(map) {

    const extension = map.image.name.split('.').pop();
    const fileName = `${map.title}.${extension}`;

    const bufferedImage = await map.image.arrayBuffer();

    s3.putObject({
        Bucket: 'project-jdr-bucket.s3.eu-west-3.amazonaws.com/maps/',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: map.image.type,
    });
    map.image = fileName;

    db.prepare(
        `
            INSERT INTO maps
                (id, title, filename, id_campain)
            VALUES (
                    null,
                    @title,
                    @filename,
                    @id_campain
                   )
        `
    ).run(map);
}

