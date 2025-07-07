const fs = require("fs");
const path = require("path");

function cargarSQLPorNombre(rutaRelativaOAbsoluta, nombreConsulta) {
  // Resolvemos ruta absoluta desde el directorio actual de este archivo
  const rutaAbsoluta = path.isAbsolute(rutaRelativaOAbsoluta)
    ? rutaRelativaOAbsoluta
    : path.resolve(__dirname, rutaRelativaOAbsoluta);

  console.log(`Leyendo archivo SQL en: ${rutaAbsoluta}`);

  if (!fs.existsSync(rutaAbsoluta)) {
    throw new Error(`El archivo SQL no existe en la ruta: ${rutaAbsoluta}`);
  }

  const contenido = fs.readFileSync(rutaAbsoluta, "utf-8");
  const secciones = contenido.split(/-- nombre:\s*/).slice(1);

  for (const seccion of secciones) {
    const [nombre, ...resto] = seccion.split("\n");
    const sql = resto.join("\n").trim();
    if (nombre.trim() === nombreConsulta) return sql;
  }

  throw new Error(`Consulta "${nombreConsulta}" no encontrada en ${rutaAbsoluta}`);
}

module.exports = { cargarSQLPorNombre };

