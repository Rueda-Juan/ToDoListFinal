// correp valido, verifica si el correo pasado por parametro es valido
function esCorreoValido(correo) {
  const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|ar)$/;
  return patron.test(correo);
}

// nombre valido, no se permiten caracteres especiales ni numeros
function esNombreValido(nombre) {
  const patron = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return patron.test(nombre);
}

function esContraseñaValida(contraseña) {
  // Al menos 4 caracteres, permite letras, números y símbolos básicos
  return typeof contraseña === "string" && contraseña.length >= 4;
}

module.exports = {
  esCorreoValido,
  esNombreValido,
  esContraseñaValida,
};