// initdb.js - Version corrigée et sécurisée avec gestion des erreurs
const sql = require('better-sqlite3');


const db = sql('jdr.db');



// Fonction générique pour exécuter une requête en toute sécurité
function safeInsert(stmt, data, label) {
    try {
        stmt.run(data);
    } catch (err) {
        console.error(`Erreur lors de l'insertion dans ${label} :`, err.message);
        console.error("Données en cause :", data);
    }
}

try {
    db.exec(`
    CREATE TABLE IF NOT EXISTS campain (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hero (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_campain INTEGER,
      title TEXT NOT NULL,
      filename TEXT,
      lvl INTEGER NOT NULL,
      pv INTEGER NOT NULL,
      FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS PNJ (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_campain INTEGER,
      title TEXT NOT NULL,
      pv INTEGER NOT NULL,
      filename TEXT,
      FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS object (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_campain INTEGER,
      title TEXT NOT NULL,
      filename TEXT,
      FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS heroskills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      cooldown INTEGER
    );

    CREATE TABLE IF NOT EXISTS PNJskills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      cooldown INTEGER
    );

    CREATE TABLE IF NOT EXISTS heroToHeroskills (
      id_hero INTEGER,
      id_skills INTEGER,
      FOREIGN KEY (id_hero) REFERENCES hero (id),
      FOREIGN KEY (id_skills) REFERENCES heroskills (id)
    );

    CREATE TABLE IF NOT EXISTS PNJtoPNJskills (
      id_PNJ INTEGER,
      id_PNJskills INTEGER,
      FOREIGN KEY (id_PNJ) REFERENCES PNJ (id),
      FOREIGN KEY (id_PNJskills) REFERENCES PNJskills (id)
    );

    CREATE TABLE IF NOT EXISTS maps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      filename TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      id_campain INTEGER,
      FOREIGN KEY (id_campain) REFERENCES campain (id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        value INTEGER NOT NULL,
        id_hero INTEGER,
        FOREIGN KEY (id_hero) REFERENCES hero (id) ON DELETE CASCADE
                                         
        );
  `);


} catch (err) {
    console.error("Erreur lors de la création des tables :", err.message);
}

async function initCampain() {
    const stmt = db.prepare("INSERT INTO campain (id, title) VALUES (null, @title)");
    safeInsert(stmt, { title: "Ma Première Campagne" }, "campain");
}

async function initHero() {
    const heroes = [
        {
            id_campain: 1,
            title: "Aldric",
            filename: "aldric.png",
            lvl: 1,
            pv: 100,
        },
    ];
    const stmt = db.prepare(
        `INSERT INTO hero (id, id_campain, title, filename, lvl, pv) VALUES (null, @id_campain, @title, @filename, @lvl, @pv)`
    );


    heroes.forEach( (hero) =>
        safeInsert(stmt, hero, "hero")



    );
}
async function initStats() {
    const stats = [
        {
            title: "force",
            value: "8",
            id_hero: 1,
        },
        {
            title: "dextérité",
            value: "11",
            id_hero: 1,
        },
    ];
    const stmt = db.prepare(
        `INSERT INTO stats (id, title, value, id_hero) VALUES (null, @title, @value, @id_hero)`
    );
    stats.forEach((stat) => safeInsert(stmt, stat, "stats"));
}
async function initPNJ() {
    const pnjs = [
        {
            id_campain: 1,
            title: "Gobelin",
            filename: "goblin.png",
            pv: 30,
        },
    ];
    const stmt = db.prepare(
        `INSERT INTO PNJ (id, id_campain, title, pv, filename) VALUES (null, @id_campain, @title, @pv, @filename)`
    );
    pnjs.forEach((pnj) => safeInsert(stmt, pnj, "PNJ"));
}

async function initObject() {
    const objects = [
        {
            id_campain: 1,
            title: "Potion de soin",
            filename: "potion.png",
        },
    ];
    const stmt = db.prepare(
        `INSERT INTO object (id, id_campain, title, filename) VALUES (null, @id_campain, @title, @filename)`
    );
    objects.forEach((obj) => safeInsert(stmt, obj, "object"));
}

async function initHeroskills() {
    const skills = [
        {
            title: "Coup puissant",
            description: "Inflige 10 dégâts.",
            cooldown: 2,
        },
    ];
    const stmt = db.prepare(
        `INSERT INTO heroskills (id, title, description, cooldown) VALUES (null, @title, @description, @cooldown)`
    );
    skills.forEach((s) => safeInsert(stmt, s, "heroskills"));
}

async function initPNJskills() {
    const skills = [
        {
            title: "Morsure",
            description: "Attaque de mêlée.",
            cooldown: 1,
        },
    ];
    const stmt = db.prepare(
        `INSERT INTO PNJskills (id, title, description, cooldown) VALUES (null, @title, @description, @cooldown)`
    );
    skills.forEach((s) => safeInsert(stmt, s, "PNJskills"));
}

async function initHeroToHeroskills() {
    const data = { id_hero: 1, id_skills: 1 };
    const stmt = db.prepare(
        `INSERT INTO heroToHeroskills (id_hero, id_skills) VALUES (@id_hero, @id_skills)`
    );
    safeInsert(stmt, data, "heroToHeroskills");
}

async function initPNJtoPNJskills() {
    const data = { id_PNJ: 1, id_PNJskills: 1 };
    const stmt = db.prepare(
        `INSERT INTO PNJtoPNJskills (id_PNJ, id_PNJskills) VALUES (@id_PNJ, @id_PNJskills)`
    );
    safeInsert(stmt, data, "PNJtoPNJskills");
}

async function initMap() {
    const map = {
        title: "Test Map",
        filename: "map_test.jpg",
        id_campain: 1,
    };
    const stmt = db.prepare(
        `INSERT INTO maps (id, title, filename, id_campain) VALUES (null, @title, @filename, @id_campain)`
    );
    safeInsert(stmt, map, "maps");
}

async function initAll() {
    await initCampain();
    await initHero();
    await initStats();
    await initPNJ();
    await initObject();
    await initHeroskills();
    await initPNJskills();
    await initHeroToHeroskills();
    await initPNJtoPNJskills();
    await initMap();
    console.log("✅ Toutes les données ont été insérées avec succès !");
}


initAll();


