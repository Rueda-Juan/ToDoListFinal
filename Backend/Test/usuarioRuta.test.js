const request = require("supertest");
const express = require("express");
const usuarioRouter = require("../Routes/usuarioRuta");

// Mock(simular) de usuarioServicio
jest.mock("../servicios/usuarioServicio", () => ({
    crearUsuario: jest.fn(),
    obtenerUsuarioPorCorreo: jest.fn(),
    obtenerUsuario: jest.fn(),
    actualizarUsuario: jest.fn(),
    eliminarUsuario: jest.fn(),
}));

const usuarioServicio = require("../servicios/usuarioServicio");

// App de prueba
const app = express();
app.use(express.json());
app.use("/usuario", usuarioRouter);

//TEST 1: Registrar Exitoso de Usuario
test("POST /usuario/register - crea usuario con éxito", async () => {
    usuarioServicio.crearUsuario.mockResolvedValue(1);

    const res = await request(app)
        .post("/usuario/register")
        .send({
        correo: "test@correo.com",
        nombre: "Usuario Prueba",
        contraseña: "1234",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("correo");
});


// TEST 2 : Registro con Correo Invalido
test("POST /usuario/register - falla por correo inválido", async () => {
    const res = await request(app)
        .post("/usuario/register")
        .send({
        correo: "correo-malo",
        nombre: "Usuario",
        contraseña: "1234",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Correo inválido." });
});

//TEST 3 : Login Exitoso
test("POST /usuario/login - login exitoso", async () => {
    usuarioServicio.obtenerUsuarioPorCorreo.mockResolvedValue({
        id_usuario: 1,
        correo: "test@correo.com",
        nombre: "Nombre",
        contraseña: "1234", // Simula login plano (sin bcrypt)
    });

    const res = await request(app)
        .post("/usuario/login")
        .send({ correo: "test@correo.com", contraseña: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("correo", "test@correo.com");
    expect(res.body).not.toHaveProperty("contraseña");
});

// TEST 4 : Login Incorrecto

test("POST /usuario/login - falla con credenciales incorrectas", async () => {
    usuarioServicio.obtenerUsuarioPorCorreo.mockResolvedValue({
        id_usuario: 1,
        correo: "test@correo.com",
    nombre: "Nombre",
    contraseña: "distinta", // no coincide
});

    const res = await request(app)
        .post("/usuario/login")
        .send({ correo: "test@correo.com", contraseña: "1234" });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales invalidas" });
});


    // TEST 5 : Obtener Usuario Exitoso
test("Obtener usuario por ID - éxito", async () => {
    usuarioServicio.obtenerUsuario.mockResolvedValue({
        id_usuario: 1,
        nombre: "Usuario",
        correo: "test@example.com",
    });

    const res = await request(app).get("/usuario/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("correo", "test@example.com");
});

    // TEST 6 : Obtener Usuario Inexistente
test("Obtener usuario por ID - no encontrado", async () => {
    usuarioServicio.obtenerUsuario.mockResolvedValue(null);

    const res = await request(app).get("/usuario/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Usuario no encontrado");
});



    // TEST 7 : Actualizar Usuario Exito
test("Actualizar usuario - éxito", async () => {
    usuarioServicio.actualizarUsuario.mockResolvedValue(true);

    const res = await request(app)
        .put("/usuario/1")
        .send({ nombre: "Nuevo Nombre", contraseña: "5678" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensaje: "Usuario actualizado" });
});

    // TEST 8 : Actualizar Usuario - No Realizar Cambio
test("Actualizar usuario - no encontrado o sin cambios", async () => {
    usuarioServicio.actualizarUsuario.mockResolvedValue(false);

    const res = await request(app)
        .put("/usuario/1")
        .send({ nombre: "Sin cambios", contraseña: "5678" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Usuario no encontrado o sin cambios");
});


// TEST 9 : Eliminar Exitoso Usuario
test("Eliminar usuario - éxito", async () => {
    usuarioServicio.eliminarUsuario.mockResolvedValue(true);

    const res = await request(app).delete("/usuario/1");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ mensaje: "Usuario eliminado" });
});


// TEST 10 : Eliminar Usuario Inexistente
test("Eliminar usuario - no encontrado", async () => {
    usuarioServicio.eliminarUsuario.mockResolvedValue(false);

    const res = await request(app).delete("/usuario/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Usuario no encontrado");
});


