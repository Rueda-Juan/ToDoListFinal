// Backend/Test/usuarioservicio.test.js
const db = require("../bd/database");
const { cargarSQLPorNombre } = require("../utils/sqlLoader");
const usuarioServicio = require("../servicios/usuarioServicio");

// Mocks
jest.mock("../bd/database", () => ({
  run: jest.fn(),
  get: jest.fn(),
}));

jest.mock("../utils/sqlLoader", () => ({
  cargarSQLPorNombre: jest.fn(),
}));

describe("usuarioservicio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("crearUsuario devuelve lastID", async () => {
  const mockLastID = 101;

  db.run.mockImplementation((sql, params, callback) => {
    // Simular correctamente el contexto `this`
    callback.call({ lastID: mockLastID }, null);
  });

  cargarSQLPorNombre.mockReturnValue("INSERT INTO Usuario ...");

  const id = await usuarioServicio.crearUsuario("test@email.com", "Juan", "secreta123");
  expect(id).toBe(mockLastID);
});

  test("obtenerUsuario devuelve el usuario esperado", async () => {
    const mockRow = { id_usuario: 1, nombre: "Ana" };
    db.get.mockImplementation((sql, params, callback) => callback(null, mockRow));
    cargarSQLPorNombre.mockReturnValue("SELECT * FROM Usuario WHERE id_usuario = ?");

    const user = await usuarioServicio.obtenerUsuario(1);
    expect(user).toEqual(mockRow);
    expect(db.get).toHaveBeenCalled();
  });

  test("obtenerUsuarioPorCorreo devuelve el usuario esperado", async () => {
    const mockRow = { id_usuario: 2, correo: "pepe@test.com" };
    db.get.mockImplementation((sql, params, callback) => callback(null, mockRow));
    cargarSQLPorNombre.mockReturnValue("SELECT * FROM Usuario WHERE correo = ?");

    const user = await usuarioServicio.obtenerUsuarioPorCorreo("pepe@test.com");
    expect(user).toEqual(mockRow);
    expect(db.get).toHaveBeenCalled();
  });

  test("actualizarUsuario actualiza nombre y contraseña", async () => {
    db.run.mockImplementation((sql, params, callback) => {
      callback.call({ changes: 1 }, null);
    });

    const result = await usuarioServicio.actualizarUsuario(1, "NuevoNombre", "NuevaClave");
    expect(result).toBe(true);
  });

  test("actualizarUsuario sin cambios retorna false", async () => {
    const result = await usuarioServicio.actualizarUsuario(1);
    expect(result).toBe(false);
    expect(db.run).not.toHaveBeenCalled();
  });

  test("eliminarUsuario elimina correctamente", async () => {
    db.run.mockImplementation((sql, params, callback) => {
      callback.call({ changes: 1 }, null);
    });

    cargarSQLPorNombre.mockReturnValue("DELETE FROM Usuario WHERE id_usuario = ?");
    const result = await usuarioServicio.eliminarUsuario(1);
    expect(result).toBe(true);
  });

  test("eliminarUsuario retorna false si no hay cambios", async () => {
    db.run.mockImplementation((sql, params, callback) => {
      callback.call({ changes: 0 }, null);
    });

    const result = await usuarioServicio.eliminarUsuario(999);
    expect(result).toBe(false);
  });
});
