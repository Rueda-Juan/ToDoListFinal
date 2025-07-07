const express = require("express");
const router = express.Router();
const tareaServicio = require("../servicios/tareaservicio");

// Crear tarea
router.post("/", async (req, res) => {
  try {
    const { id_usuario, titulo, descripcion } = req.body;
    const id = await tareaServicio.crearTarea(id_usuario, titulo, descripcion);
    res.status(201).json({ id, id_usuario, titulo, descripcion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener tarea por id
router.get("/:id", async (req, res) => {
  try {
    const tarea = await tareaServicio.obtenerTarea(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener tareas por usuario
router.get("/usuario/:id_usuario", async (req, res) => {
  try {
    const tareas = await tareaServicio.obtenerTareasPorUsuario(req.params.id_usuario);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar tarea
router.put("/:id", async (req, res) => {
  try {
    const { titulo, descripcion, completada } = req.body;
    const actualizado = await tareaServicio.actualizarTarea(
      req.params.id,
      titulo,
      descripcion,
      completada
    );
    if (!actualizado) return res.status(404).json({ error: "Tarea no encontrada o sin cambios" });
    res.json({ mensaje: "Tarea actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar tarea
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await tareaServicio.eliminarTarea(req.params.id);
    if (!eliminado) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
