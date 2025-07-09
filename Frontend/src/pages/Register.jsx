import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        alert("Registro exitoso, ahora inicia sesión");
        navigate("/login");
      } else {
        alert(data.error || "Error al registrar usuario");
      }
    } catch (err) {
      alert("Error de red");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Registrarse</h2>
        <form onSubmit={manejarSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
          <button onClick={() => navigate("/login")} className="btn btn-link glass p-0 m-0 align-baseline">
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
