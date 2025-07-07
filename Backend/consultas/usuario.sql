-- nombre: crear_usuario
INSERT INTO Usuario(correo, nombre, contraseña) VALUES (?, ?, ?);

-- nombre: obtener_usuario
SELECT * FROM Usuario WHERE id_usuario = ?;

-- nombre: obtener_usuario_por_correo
SELECT * FROM Usuario WHERE correo = ?;

-- nombre: actualizar_usuario
UPDATE Usuario SET {campos} WHERE id_usuario = ?;

-- nombre: eliminar_usuario
DELETE FROM Usuario WHERE id_usuario = ?;
