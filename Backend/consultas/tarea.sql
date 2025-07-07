-- nombre: crear_tarea
INSERT INTO Tarea(id_usuario, titulo, descripcion) VALUES (?, ?, ?);

-- nombre: obtener_tarea
SELECT * FROM Tarea WHERE id_tarea = ?;

-- nombre: obtener_tareas_por_usuario
SELECT * FROM Tarea WHERE id_usuario = ?;

-- nombre: actualizar_tarea
UPDATE Tarea SET {campos} WHERE id_tarea = ?;

-- nombre: eliminar_tarea
DELETE FROM Tarea WHERE id_tarea = ?;
