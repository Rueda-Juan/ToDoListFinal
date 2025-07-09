import { useState, useRef } from "react";
import Swal from 'sweetalert2';


function OpcionesModal({ mostrar, onClose, usuario }) {
  const [nuevoNombre, setNuevoNombre] = useState(usuario.nombre);
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [contraseñaEliminar, setContraseñaEliminar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info"); // info / success / danger
  const modalBodyRef = useRef(null);

  if (!mostrar) return null;

  const mostrarMensaje = (texto, tipo = "info") => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => setMensaje(""), 5000);
  };

  const handleActualizarNombre = async () => {
    try {
      const res = await fetch(`http://localhost:3001/usuarios/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });
      const data = await res.json();
      if (res.ok) {
        mostrarMensaje("Nombre actualizado correctamente.", "success");
        const actualizado = { ...usuario, nombre: nuevoNombre };
        localStorage.setItem("usuario", JSON.stringify(actualizado));
      } else {
        mostrarMensaje(data.error || "Error al actualizar nombre.", "danger");
      }
    } catch {
      mostrarMensaje("Error de red.", "danger");
    }
  };

  const handleCambiarContraseña = async () => {
    try {
      const resLogin = await fetch("http://localhost:3001/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: usuario.correo, contraseña: contraseñaActual }),
      });

      if (!resLogin.ok) return mostrarMensaje("Contraseña actual incorrecta.", "danger");

      const res = await fetch(`http://localhost:3001/usuarios/${usuario.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contraseña: nuevaContraseña }),
      });

      const data = await res.json();
      if (res.ok) {
        mostrarMensaje("Contraseña actualizada correctamente.", "success");
        setContraseñaActual("");
        setNuevaContraseña("");
      } else {
        mostrarMensaje(data.error || "Error al actualizar contraseña.", "danger");
      }
    } catch {
      mostrarMensaje("Error de red.", "danger");
    }
  };


  //Funcion para eliminar la cuenta
  const handleEliminarCuenta = async () => {
    if (!contraseñaEliminar) {
      return mostrarMensaje("Por favor ingresá tu contraseña para confirmar.", "danger");
    }

    try {
      const resLogin = await fetch("http://localhost:3001/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: usuario.correo, contraseña: contraseñaEliminar }),
      });

      if (!resLogin.ok) {
        return mostrarMensaje("Contraseña incorrecta.", "danger");
      }

      // Mostrar alerta de confirmación
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará tu cuenta permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      });

      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:3001/usuarios/${usuario.id_usuario}`, {
          method: "DELETE",
        });

        if (res.ok) {
          await Swal.fire('Cuenta eliminada', 'Tu cuenta fue eliminada exitosamente.', 'success');
          localStorage.removeItem("usuario");
          window.location.href = "/login";
        } else {
          const data = await res.json();
          mostrarMensaje(data.error || "Error al eliminar cuenta.", "danger");
        }
      }

    } catch {
      mostrarMensaje("Error de red.", "danger");
    }
  };

  return (
    <div className="modal d-block fade show" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content glass p-3">
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">⚙️ Opciones de cuenta</h5>
            <button className="btn-close glass btn-glass-red" onClick={onClose}><i class="bi bi-x"></i></button>
          </div>
          <div className="modal-body" ref={modalBodyRef}>
            {mensaje && (
              <div className={`alert alert-${tipoMensaje} mb-4`} role="alert">
                {mensaje}
              </div>
            )}

            {/* Cambiar nombre */}
            <h6 className="fw-bold">📝 Cambiar nombre</h6>
            <div className="mb-3">
              <input
                type="text"
                className="form-control glass"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
            </div>
            <button onClick={handleActualizarNombre} className="btn glass btn-glass-green w-100 mb-4">
              Guardar nuevo nombre
            </button>

            <hr />

            {/* Cambiar contraseña */}
            <h6 className="fw-bold">🔐 Cambiar contraseña</h6>
            <div className="mb-2">
              <input
                type="password"
                className="form-control glass"
                placeholder="Contraseña actual"
                value={contraseñaActual}
                onChange={(e) => setContraseñaActual(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control glass"
                placeholder="Nueva contraseña"
                value={nuevaContraseña}
                onChange={(e) => setNuevaContraseña(e.target.value)}
              />
            </div>
            <button onClick={handleCambiarContraseña} className="btn glass btn-glass-yellow w-100 mb-4">
              Cambiar contraseña
            </button>

            <hr />

            {/* Eliminar cuenta */}
            <h6 className="fw-bold text-danger">🗑️ Eliminar cuenta</h6>
            <p className="small mb-2">
              Esta acción <strong>no se puede deshacer</strong>. Escribí tu contraseña:
            </p>
            <div className="mb-2">
              <input
                type="password"
                className="form-control glass "
                placeholder="Confirmar contraseña"
                value={contraseñaEliminar}
                onChange={(e) => setContraseñaEliminar(e.target.value)}

              />
            </div>
            <button onClick={handleEliminarCuenta} className="btn glass btn-glass-red w-100">
              Eliminar cuenta permanentemente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpcionesModal;