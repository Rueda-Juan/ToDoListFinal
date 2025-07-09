const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "tareas.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error conectando a SQLite:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite");
    // Activar soporte para claves foráneas
    db.run("PRAGMA foreign_keys = ON", (err) => {
      if (err) {
        console.error("Error activando claves foráneas:", err.message);
      } else {
        console.log("Claves foráneas activadas");
      }
    });
  }
});

module.exports = db;