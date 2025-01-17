const sql = require('better-sqlite3');
const db = sql('jdr.db');


const dummyCampain =
    {
        title: 'Testing',
    };
const dummyHero = {
    name: 'HeroTest',
    image: 'hero_test.jpg',
    lvl: 1,
    pv: 100,
    id_campain: 1
}
const dummyHeroSkills = {
    title: 'Test Skill',
    description: 'This is a test skill.',
    cooldown: 30,
}
const dummyMap = {
    title: 'Test Map',
    image: 'map_test.jpg',
    id_campain: 1
}
const dummyPNJ = {
    name: 'PNJ Test',
    image: 'pnj_test.jpg',
    pv: 30,
    id_campain: 1,
}
const dummyObject = {
    id: 1,
    title: 'Test Object',
    image: 'object_test.jpg',
    id_campain: 1,
}
const dummyHeroToHeroSkills = {
    id_hero: 1,
    id_skills: 1,
}
const dummyPNJToPNJskills = {
    id_PNJ: 1,
    id_PNJskills: 1,
}
const dummyPNJskills = {
    id: 1,
    title: 'Test Skill',
    description: 'This is a test skill.',
    cooldown: 30,
}

// Création des tables de la base de données
db.prepare(`
    CREATE TABLE IF NOT EXISTS hero
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_campain INTEGER,
        name TEXT NOT NULL,
        image TEXT,
        lvl INTEGER NOT NULL,
        pv INTEGER NOT NULL,
        FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
    )`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS heroskills
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        cooldown INTEGER NOT NULL
    )`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS heroToHeroskills
    (
        id_hero INTEGER,
        id_skills INTEGER,
        PRIMARY KEY (id_hero, id_skills),
        FOREIGN KEY (id_hero) REFERENCES hero (id) ON DELETE CASCADE,
        FOREIGN KEY (id_skills) REFERENCES heroskills (id) ON DELETE CASCADE
    )`,).run();


db.prepare(`
    CREATE TABLE IF NOT EXISTS PNJ
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_campain INTEGER ,
        name TEXT NOT NULL,
        pv INTEGER NOT NULL,
        image TEXT,
        FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE

    )`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS PNJskills
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description  TEXT,
        cooldown INTEGER NOT NULL,
        title TEXT NOT NULL
    )`).run();

db.prepare(
    `CREATE TABLE IF NOT EXISTS PNJtoPNJskills
    (
        id_PNJ INTEGER,
        id_PNJskills INTEGER,
        PRIMARY KEY (id_PNJ, id_PNJskills),
        FOREIGN KEY (id_PNJ) REFERENCES PNJ (id) ON DELETE CASCADE,
        FOREIGN KEY (id_PNJskills) REFERENCES PNJskills (id) ON DELETE CASCADE
    )`).run();
db.prepare(
    `CREATE TABLE IF NOT EXISTS object
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_campain INTEGER,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
        
    )`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS map
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_campain INTEGER,
        title  TEXT NOT NULL,
        image  TEXT,
        FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
    )`).run();
db.prepare(`CREATE TABLE IF NOT EXISTS campain
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`,).run();



async function initHero(){
    const hero = db.prepare(`
      INSERT INTO hero VALUES (
         null,
         @id_campain,
         @name,
         @image,
         @lvl,
         @pv
      )`);
    hero.run(dummyHero);

}
async function initPNJ() {
    const PNJ = db.prepare(`
      INSERT INTO PNJ VALUES (
         null,
         @id_campain,
         @name,
         @image,
         @pv
        )`
    );
    PNJ.run(dummyPNJ);
}
async function initObject() {
    const object = db.prepare(`
      INSERT INTO object VALUES (
         null,
         @id_campain,
         @title,
         @image
        )`
    );
    object.run(dummyObject);
}
async function initHeroskills() {
    const heroskills = db.prepare(`
      INSERT INTO heroskills VALUES (
         null,
         @title,
         @description,
         @cooldown
        )`
    );
    heroskills.run(dummyHeroSkills);
}
async function initPNJskills() {
    const PNJskills = db.prepare(`
      INSERT INTO PNJskills VALUES (
         null,
         @title,
         @description,
         @cooldown
        )`
    );
    PNJskills.run(dummyPNJskills);
}
async function initHeroToHeroskills() {
    const hero_to_heroskills = db.prepare(`
      INSERT INTO heroToHeroskills VALUES (
         @id_hero,
         @id_skills
        )`
    );
    hero_to_heroskills.run(dummyHeroToHeroSkills);
}
async function initPNJtoPNJskills() {
    const PNJtoPNJskills = db.prepare(`
      INSERT INTO PNJtoPNJskills VALUES (
         @id_PNJ,
         @id_PNJskills
        )`);
    PNJtoPNJskills.run(dummyPNJToPNJskills);
}
async function initMap() {
    const map = db.prepare(`
      INSERT INTO map VALUES (
         null,
         @id_campain,
         @title,
         @image
        )`
    );
    map.run(dummyMap);

}

async function initCampain() {
    const campain = db.prepare(`
      INSERT INTO campain VALUES (
         null,
         @title
      )
   `);
         campain.run(dummyCampain);
}
initCampain()
initHero();
initPNJ();
initObject();
initHeroskills();
initPNJskills();
initHeroToHeroskills();
initPNJtoPNJskills();
initMap();

console.log('Tables créées avec succès');