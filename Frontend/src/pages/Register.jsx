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
    <form onSubmit={manejarSubmit}>
      <h2>Registrarse</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
      <p onClick={() => navigate("/login")}>¿Ya tienes cuenta? Inicia sesión</p>
    </form>
  );
}

export default Register;
