import { Navigate } from "react-router-dom";

function RutaPrivada({ children }) {
  let usuario = null;

  try {
    const stored = localStorage.getItem("usuario");
    usuario = stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error al leer usuario de localStorage:", error);
    usuario = null;
  }

  return usuario ? children : <Navigate to="/login" replace />;
}

export default RutaPrivada;