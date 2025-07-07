const db = require("../bd/database");
const path = require("path");
const { cargarSQLPorNombre } = require("../utils/sqlLoader");

const rutaUsuarioSQL = path.resolve(__dirname, "..", "consultas", "usuario.sql");

// Helpers genéricos
function runQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function getQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Crear usuario
async function crearUsuario(correo, nombre, contraseña) {
  const sql = cargarSQLPorNombre(rutaUsuarioSQL, "crear_usuario");
  const result = await runQuery(sql, [correo, nombre, contraseña]);
  return result.lastID;
}

// Obtener usuario por ID
async function obtenerUsuario(id_usuario) {
  const sql = cargarSQLPorNombre(rutaUsuarioSQL, "obtener_usuario");
  return await getQuery(sql, [id_usuario]);
}

// Obtener usuario por correo
async function obtenerUsuarioPorCorreo(correo) {
  const sql = cargarSQLPorNombre(rutaUsuarioSQL, "obtener_usuario_por_correo");
  return await getQuery(sql, [correo]);
}

// Actualizar usuario
async function actualizarUsuario(id_usuario, nombre = null, contraseña = null) {
  const updates = [];
  const params = [];

  if (nombre) {
    updates.push("nombre = ?");
    params.push(nombre);
  }

  if (contraseña) {
    updates.push("contraseña = ?");
    params.push(contraseña);
  }

  if (updates.length === 0) return false;

  params.push(id_usuario);
  const sql = `UPDATE Usuario SET ${updates.join(", ")} WHERE id_usuario = ?`;
  const result = await runQuery(sql, params);

  return result.changes > 0;
}

// Eliminar usuario
async function eliminarUsuario(id_usuario) {
  const sql = cargarSQLPorNombre(rutaUsuarioSQL, "eliminar_usuario");
  const result = await runQuery(sql, [id_usuario]);
  return result.changes > 0;
}

module.exports = {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarioPorCorreo,
  actualizarUsuario,
  eliminarUsuario,
};
