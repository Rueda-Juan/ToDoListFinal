const db = require("../bd/database");
const { cargarSQLPorNombre } = require("../utils/sqlLoader");

// Crear usuario
function crearUsuario(correo, nombre, contraseña) {
  const sql = cargarSQLPorNombre("./consultas/usuario.sql", "crear_usuario");
  return new Promise((resolve, reject) => {
    db.run(sql, [correo, nombre, contraseña], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

// Obtener usuario por id
function obtenerUsuario(id_usuario) {
  const sql = cargarSQLPorNombre("./consultas/usuario.sql", "obtener_usuario");
  return new Promise((resolve, reject) => {
    db.get(sql, [id_usuario], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Obtener usuario por correo
function obtenerUsuarioPorCorreo(correo) {
  const sql = cargarSQLPorNombre("./consultas/usuario.sql", "obtener_usuario_por_correo");
  return new Promise((resolve, reject) => {
    db.get(sql, [correo], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Actualizar usuario (nombre y/o contraseña)
function actualizarUsuario(id_usuario, nombre = null, contraseña = null) {
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
  if (updates.length === 0) return Promise.resolve(false);

  params.push(id_usuario);
  const sql = `UPDATE Usuario SET ${updates.join(", ")} WHERE id_usuario = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0);
    });
  });
}

// Eliminar usuario
function eliminarUsuario(id_usuario) {
  const sql = cargarSQLPorNombre("./consultas/usuario.sql", "eliminar_usuario");
  return new Promise((resolve, reject) => {
    db.run(sql, [id_usuario], function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0);
    });
  });
}

module.exports = {
  crearUsuario,
  obtenerUsuario,
  obtenerUsuarioPorCorreo,
  actualizarUsuario,
  eliminarUsuario,
};
