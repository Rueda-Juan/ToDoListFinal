import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        alert(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      alert("Error de red");
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      <p onClick={() => navigate("/register")}>¿No tienes cuenta? Regístrate</p>
    </form>
  );
}

export default Login;
