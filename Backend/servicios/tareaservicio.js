const db = require("../bd/database");
const path = require("path");
const { cargarSQLPorNombre } = require("../utils/sqlLoader");

const rutaTareaSQL = path.resolve(__dirname, "..", "consultas", "tarea.sql");

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

function allQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// Crear tarea
async function crearTarea(id_usuario, titulo, descripcion = null) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "crear_tarea");
  const result = await runQuery(sql, [id_usuario, titulo, descripcion]);
  return result.lastID;
}

// Obtener tarea por id
async function obtenerTarea(id_tarea) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "obtener_tarea");
  return await getQuery(sql, [id_tarea]);
}

// Obtener tareas por usuario
async function obtenerTareasPorUsuario(id_usuario) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "obtener_tareas_por_usuario");
  return await allQuery(sql, [id_usuario]);
}

// Actualizar tarea
async function actualizarTarea(id_tarea, titulo = null, descripcion = null, completada = null) {
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

  if (updates.length === 0) return false;

  params.push(id_tarea);
  const sql = `UPDATE Tarea SET ${updates.join(", ")} WHERE id_tarea = ?`;

  const result = await runQuery(sql, params);
  return result.changes > 0;
}

// Eliminar tarea
async function eliminarTarea(id_tarea) {
  const sql = cargarSQLPorNombre(rutaTareaSQL, "eliminar_tarea");
  const result = await runQuery(sql, [id_tarea]);
  return result.changes > 0;
}

module.exports = {
  crearTarea,
  obtenerTarea,
  obtenerTareasPorUsuario,
  actualizarTarea,
  eliminarTarea,
};