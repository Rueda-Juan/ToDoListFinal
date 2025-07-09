const db = require("./database");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Usuario (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT UNIQUE NOT NULL,
      contraseña TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Tarea (
      id_tarea INTEGER PRIMARY KEY AUTOINCREMENT,
      id_usuario INTEGER NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      fecha_creacion TEXT DEFAULT CURRENT_TIMESTAMP,
      completada INTEGER DEFAULT 0,
      FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
    )
  `);

  console.log("Tablas creadas (si no existían)");
});
