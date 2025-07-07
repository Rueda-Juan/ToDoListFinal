const fs = require("fs");
const path = require("path");

function cargarSQLPorNombre(filePath, nombreConsulta) {
  const contenido = fs.readFileSync(path.resolve(filePath), "utf-8");
  const secciones = contenido.split(/-- nombre:\s*/).slice(1);

  for (const seccion of secciones) {
    const [nombre, ...resto] = seccion.split("\n");
    const sql = resto.join("\n").trim();
    if (nombre.trim() === nombreConsulta) return sql;
  }

  throw new Error(`Consulta "${nombreConsulta}" no encontrada en ${filePath}`);
}

module.exports = { cargarSQLPorNombre };
