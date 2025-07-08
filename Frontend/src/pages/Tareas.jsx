import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import Sidebar from "./Sidebar";
import CrearTareaModal from "./CrearTareaModal";

function Tareas() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
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
        setMostrarModal(false);
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
    <div className="container-fluid">
      <div className="row">
        <Sidebar usuario={usuario} cerrarSesion={cerrarSesion} />
        <div className="col-12 col-md-9 col-lg-10 py-4 px-md-5 position-relative">
          <h3 className="mb-4 fw-semibold">Mis tareas</h3>

          <div className="row g-4">
            {tareas.map((tarea) => (
              <div key={tarea.id_tarea} className="col-12 col-md-6">
                <TaskCard
                  tarea={tarea}
                  onToggle={marcarComoCompletada}
                  onDelete={eliminarTarea}
                />
              </div>
            ))}
          </div>

          <button
            className="btn btn-glass-blue glass rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg"
            style={{ width: "60px", height: "60px", fontSize: "28px", zIndex: 1050 }}
            onClick={() => setMostrarModal(true)}
          >
            +
          </button>

          <CrearTareaModal
            mostrar={mostrarModal}
            onClose={() => setMostrarModal(false)}
            onSubmit={crearTarea}
            titulo={titulo}
            setTitulo={setTitulo}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
          />
        </div>
      </div>
    </div>
  );
}

export default Tareas;

