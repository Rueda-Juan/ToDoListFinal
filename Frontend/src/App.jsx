import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tareas from "./pages/Tareas";
// import Opciones from "./pages/Opciones"

function App() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tareas"
          element={usuario ? <Tareas /> : <Navigate to="/login" replace />}
        />
        {/* <Route path="/opciones" element={usuario ? <Opciones /> : <Navigate to="/login" replace />} /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
