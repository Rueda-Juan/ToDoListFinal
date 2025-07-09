import { useNavigate } from "react-router-dom";

function Sidebar({ usuario, cerrarSesion, setMostrarOpciones, setSidebarVisible }) {
  const navigate = useNavigate();

  return (
    <div className="glass min-vh-100 p-3 d-flex flex-column justify-content-between" style={{ width: "100%", maxWidth: "250px" }}>
      <div>
        {/* Botón para cerrar el sidebar en móvil */}
        <div className="d-md-none text-end">
          <button className="btn-close glass p-1 btn-glass-red mb-3" onClick={() => setSidebarVisible(false)}>
            ✕
          </button>
        </div>

        <h5 className="mb-4 p-2">{usuario.nombre}</h5>
        <button className="btn glass btn-glass-blue w-100 mb-2" onClick={() => setMostrarOpciones(true)}>
          Opciones
        </button>
      </div>

      <button className="btn glass btn-glass-red w-100 mt-2" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Sidebar;
