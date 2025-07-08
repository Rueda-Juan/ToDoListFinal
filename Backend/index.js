const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const usuarioRuta = require("./Routes/usuarioRuta");
const tareaRuta = require("./Routes/tareaRuta");

app.use("/usuarios", usuarioRuta);
app.use("/tareas", tareaRuta);

// Inicio del servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
