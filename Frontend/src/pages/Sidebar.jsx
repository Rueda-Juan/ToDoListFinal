import { useNavigate } from "react-router-dom";

function Sidebar({ usuario, cerrarSesion }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-3 col-lg-2 glass min-vh-100 p-3 d-flex flex-column justify-content-between">
      <div>
        <h5 className="mb-4 p-2">{usuario.nombre}</h5>
        <button className="btn glass btn-glass-blue w-100 mb-2" onClick={() => navigate("/opciones")}>
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
