import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3001/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, nombre, contraseña }),
    });
    const data = await res.json();
    if (res.ok) {
      await Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Ahora podés iniciar sesión.',
        confirmButtonColor: '#3085d6',
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: data.error || "Ocurrió un error al registrar el usuario.",
        confirmButtonColor: '#d33',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo conectar con el servidor.',
      confirmButtonColor: '#d33',
    });
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 glass" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Registrarse</h2>
        <form onSubmit={manejarSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control glass"
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control glass"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control glass"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn glass btn-glass-blue btn-success w-100">Registrarse</button>
        </form>
        <p className="text-center mt-3 mb-0">
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => navigate("/login")} className="btn glass btn-glass-blue p-1 m-0 align-baseline">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
