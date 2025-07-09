import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import Sidebar from "./Sidebar";
import CrearTareaModal from "./CrearTareaModal";
import OpcionesModal from "./OpcionesModal";
import EditarTareaModal from "./EditarTareaModal";
import Swal from 'sweetalert2';

function Tareas() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);
  const [esCelular, setEsCelular] = useState(window.innerWidth < 768);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const manejarResize = () => {
      setEsCelular(window.innerWidth < 768);
    };

    window.addEventListener("resize", manejarResize);
    return () => window.removeEventListener("resize", manejarResize);
  }, []);

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
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3001/tareas/${id}`, { method: 'DELETE' });
        setTareas(tareas.filter((t) => t.id_tarea !== id));
        Swal.fire('Eliminada', 'La tarea fue eliminada.', 'success');
      } catch (err) {
        console.error('Error al eliminar tarea:', err);
        Swal.fire('Error', 'No se pudo eliminar la tarea.', 'error');
      }
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

  const abrirModalEdicion = (tarea) => {
    setTareaAEditar(tarea);
    setMostrarEditarModal(true);
  };

  const editarTarea = async () => {
    const result = await Swal.fire({
      title: '¿Confirmás la modificación?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        setMostrarEditarModal(false);
        setTareaAEditar(null);
        cargarTareas();
        Swal.fire('Modificada', 'La tarea fue modificada correctamente.', 'success');
      } catch (err) {
        console.error('Error al modificar tarea:', err);
        Swal.fire('Error', 'No se pudo modificar la tarea.', 'error');
      }
    }

  };

  const cerrarSesion = async () => {
    const result = await Swal.fire({
      title: '¿Querés cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('usuario');
      navigate('/login');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Encabezado en móvil */}
        {esCelular && (
          <header className="glass d-flex justify-content-between align-items-center p-3 w-100 border-bottom">
            <button className="btn" onClick={() => setSidebarVisible(true)}>
              <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
            </button>
            <h5 className="m-0">Mis tareas</h5>
          </header>
        )}

        {/* Sidebar para escritorio */}
        {!esCelular && (
          <div className="col-md-3 col-lg-2 p-0">
            <Sidebar
              usuario={usuario}
              cerrarSesion={cerrarSesion}
              setMostrarOpciones={setMostrarOpciones}
            />
          </div>
        )}

        {/* Sidebar deslizable en móvil */}
        {esCelular && sidebarVisible && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ zIndex: 1050 }}
            onClick={() => setSidebarVisible(false)}
          >
            <div
              className="h-100"
              style={{ width: "250px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                usuario={usuario}
                cerrarSesion={cerrarSesion}
                setMostrarOpciones={setMostrarOpciones}
                setSidebarVisible={setSidebarVisible}
              />
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <div className={`py-4 px-md-5 ${esCelular ? "col-12" : "col-md-9 col-lg-10"} position-relative`}>
          {!esCelular && <h3 className="mb-4 fw-semibold">Mis tareas</h3>}

          <div className="row g-4">
            {tareas.map((tarea) => (
              <div key={tarea.id_tarea} className="col-12 col-md-6 col-lg-4">
                <TaskCard
                  tarea={tarea}
                  onToggle={marcarComoCompletada}
                  onDelete={eliminarTarea}
                  onModificar={abrirModalEdicion}
                />
              </div>
            ))}
          </div>

          {/* Botón flotante */}
          <button
            className="btn btn-glass-blue glass rounded-circle position-fixed bottom-0 end-0 m-4"
            style={{ width: "60px", height: "60px", fontSize: "28px", zIndex: 1050 }}
            onClick={() => setMostrarModal(true)}
          >
            +
          </button>

          {/* Modales */}
          <CrearTareaModal
            mostrar={mostrarModal}
            onClose={() => setMostrarModal(false)}
            onSubmit={crearTarea}
            titulo={titulo}
            setTitulo={setTitulo}
            descripcion={descripcion}
            setDescripcion={setDescripcion}
          />
          <OpcionesModal
            mostrar={mostrarOpciones}
            onClose={() => setMostrarOpciones(false)}
            usuario={usuario}
          />
          {tareaAEditar && (
            <EditarTareaModal
              mostrar={mostrarEditarModal}
              tarea={tareaAEditar}
              onClose={() => {
                setMostrarEditarModal(false);
                setTareaAEditar(null);
              }}
              onSubmit={editarTarea}
              setTarea={setTareaAEditar}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tareas;
