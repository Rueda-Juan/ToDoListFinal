const express = require("express");
const router = express.Router();
const usuarioServicio = require("../servicios/usuarioServicio");
const {
  esCorreoValido,
  esNombreValido,
  esContraseñaValida,
} = require("../utils/validator");

// EndPoints para Crear usuario
router.post("/", async (req, res) => {
  try {
    const { correo, nombre, contraseña } = req.body;

    if (!esCorreoValido(correo)) {
      return res.status(400).json({ error: "Correo inválido." });
    }

    if (!esNombreValido(nombre)) {
      return res.status(400).json({ error: "Nombre inválido. Solo letras y espacios." });
    }

    if (!esContraseñaValida(contraseña)) {
      return res.status(400).json({ error: "Contraseña inválida. Debe tener al menos 4 caracteres." });
    }

    const id = await usuarioServicio.crearUsuario(correo, nombre, contraseña);
    res.status(201).json({ id, correo, nombre });
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//EndPoints para  Registrar usuario
router.post("/register", async (req, res) => {
  try {
    const { correo, nombre, contraseña } = req.body;

    if (!esCorreoValido(correo)) {
      return res.status(400).json({ error: "Correo inválido." });
    }

    if (!esNombreValido(nombre)) {
      return res.status(400).json({ error: "Nombre inválido." });
    }

    if (!esContraseñaValida(contraseña)) {
      return res.status(400).json({ error: "Contraseña inválida." });
    }

    const id = await usuarioServicio.crearUsuario(correo, nombre, contraseña);
    res.status(201).json({ id, correo, nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para Login
router.post("/login", async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Aquí validación simple de contraseña (recomendado usar bcrypt para producción)
    if (!esCorreoValido(correo)) {
      return res.status(400).json({ error: "Correo inválido." });
    }

    if (!esContraseñaValida(contraseña)) {
      return res.status(400).json({ error: "Contraseña inválida." });
    }

    const usuario = await usuarioServicio.obtenerUsuarioPorCorreo(correo);
    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    const { contraseña: _, ...usuarioSinPass } = usuario;
    res.json(usuarioSinPass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// EndPoint para Obtener usuario por id
router.get("/:id", async (req, res) => {
  try {
    const usuario = await usuarioServicio.obtenerUsuario(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EndPoitns para Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const { nombre, contraseña } = req.body;

    if (nombre !== undefined && !esNombreValido(nombre)) {
      return res.status(400).json({ error: "Nombre inválido." });
    }

    if (contraseña !== undefined && !esContraseñaValida(contraseña)) {
      return res.status(400).json({ error: "Contraseña inválida." });
    }

    const actualizado = await usuarioServicio.actualizarUsuario(req.params.id, nombre, contraseña);
    if (!actualizado) return res.status(404).json({ error: "Usuario no encontrado o sin cambios" });
    res.json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await usuarioServicio.eliminarUsuario(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registro
// router.post("/register", async (req, res) => {
//   try {
//     const { correo, nombre, contraseña } = req.body;
//     const id = await usuarioServicio.crearUsuario(correo, nombre, contraseña);
//     res.status(201).json({ id, correo, nombre });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Login
// router.post("/login", async (req, res) => {
//   try {
//     const { correo, contraseña } = req.body;
//     const usuario = await usuarioServicio.obtenerUsuarioPorCorreo(correo);
//     if (!usuario) return res.status(401).json({ error: "Correo o contraseña incorrectos" });

//     // Aquí validación simple de contraseña (recomendado usar bcrypt para producción)
//     if (usuario.contraseña !== contraseña) {
//       return res.status(401).json({ error: "Correo o contraseña incorrectos" });
//     }

//     // No enviar contraseña al frontend
//     const { contraseña: _, ...usuarioSinPass } = usuario;
//     res.json(usuarioSinPass);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
