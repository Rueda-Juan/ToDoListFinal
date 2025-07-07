import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";

function Tareas() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) return navigate("/login");
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    try {
      const res = await fetch(`http://localhost:3001/tareas/usuario/${usuario.id_usuario}`);
      const data = await res.json();
      setTareas(data);
    } catch (err) {
      console.error("Error al cargar tareas:", err);
    }
  };

  const crearTarea = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: usuario.id_usuario, titulo, descripcion }),
      });
      if (res.ok) {
        setTitulo("");
        setDescripcion("");
        cargarTareas();
      } else {
        alert("Error al crear tarea");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`http://localhost:3001/tareas/${id}`, { method: "DELETE" });
      setTareas(tareas.filter((t) => t.id_tarea !== id));
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  const marcarComoCompletada = async (id, completada) => {
    try {
      await fetch(`http://localhost:3001/tareas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completada: completada ? 0 : 1 }),
      });
      cargarTareas();
    } catch (err) {
      console.error("Error al marcar tarea:", err);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div>
      <h2>Hola, {usuario.nombre}</h2>
      <button onClick={cerrarSesion}>Cerrar sesión</button>

      <form onSubmit={crearTarea}>
        <h3>Agregar nueva tarea</h3>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
        <button type="submit">Crear tarea</button>
      </form>

      <h3>Mis tareas</h3>
      <ul>
        {tareas.map((tarea) => (
          <TaskCard
            key={tarea.id_tarea}
            tarea={tarea}
            onToggle={marcarComoCompletada}
            onDelete={eliminarTarea}
          />
        ))}
      </ul>
    </div>
  );
}

export default Tareas;
