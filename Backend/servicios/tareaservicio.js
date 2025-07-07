const db = require("../bd/database");
const path = require("path");
const { cargarSQLPorNombre } = require("../utils/sqlLoader");

const rutaTareaSQL = path.resolve(__dirname, "..", "consultas", "tarea.sql");

// Crear tarea
function crearTarea(id_usuario, titulo, descripcion = null) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "crear_tarea");
  return new Promise((resolve, reject) => {
    db.run(sql, [id_usuario, titulo, descripcion], function (err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
}

// Obtener tarea por id
function obtenerTarea(id_tarea) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "obtener_tarea");
  return new Promise((resolve, reject) => {
    db.get(sql, [id_tarea], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// Obtener tareas por usuario
function obtenerTareasPorUsuario(id_usuario) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "obtener_tareas_por_usuario");
  return new Promise((resolve, reject) => {
    db.all(sql, [id_usuario], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Actualizar tarea
function actualizarTarea(id_tarea, titulo = null, descripcion = null, completada = null) {
  const updates = [];
  const params = [];

  if (titulo !== null) {
    updates.push("titulo = ?");
    params.push(titulo);
  }
  if (descripcion !== null) {
    updates.push("descripcion = ?");
    params.push(descripcion);
  }
  if (completada !== null) {
    updates.push("completada = ?");
    params.push(completada);
  }
  if (updates.length === 0) return Promise.resolve(false);

  params.push(id_tarea);
  const sql = `UPDATE Tarea SET ${updates.join(", ")} WHERE id_tarea = ?`;

  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0);
    });
  });
}

// Eliminar tarea
function eliminarTarea(id_tarea) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "eliminar_tarea");
  return new Promise((resolve, reject) => {
    db.run(sql, [id_tarea], function (err) {
      if (err) reject(err);
      else resolve(this.changes > 0);
    });
  });
}

module.exports = {
  crearTarea,
  obtenerTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
};
