import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3001/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, contraseña }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("usuario", JSON.stringify(data));
      navigate("/tareas");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: data.error || 'Credenciales inválidas',
        confirmButtonColor: '#3085d6',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo conectar al servidor.',
      confirmButtonColor: '#3085d6',
    });
  }
};

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card glass p-4 " style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
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
          <button type="submit" className="btn glass btn-glass-blue w-100">Entrar</button>
        </form>
        <p className="text-center mt-3 mb-0">
          ¿No tienes cuenta?{" "}
          <button onClick={() => navigate("/register")} className="btn glass btn-glass-blue p-1 m-0 align-baseline">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
