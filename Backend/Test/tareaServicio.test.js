jest.mock('../bd/database.js'); // simulacion de una base de datos
jest.mock('../utils/sqlLoader'); // simulacion del modulo cargarSQL

jest.mock('../bd/database', () => ({
  run: jest.fn(),
  get: jest.fn(),
  all: jest.fn(),
}));

const db = require('../bd/database');
const { cargarSQLPorNombre } = require('../utils/sqlLoader');
const tareaservicio = require('../servicios/tareaservicio');

// TEST: 6 TEST EN TOTAL
describe('tareaservicio', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

//Test de CREAR TAREA 
  test('crearTarea resuelve con lastID', async () => {
  const mockSQL = 'INSERT INTO Tarea...';
  const mockLastID = 42;

  cargarSQLPorNombre.mockReturnValue(mockSQL);
  db.run.mockImplementation(function (sql, params, callback) {
    this.lastID = mockLastID;
    callback.call(this, null);
  });

  const id = await tareaservicio.crearTarea(1, 'Test tarea', 'Descripción');
  expect(id).toBe(mockLastID);
});

// Test de OBTENER TAREA
  test('obtenerTarea devuelve la fila esperada', async () => {
    const mockSQL = 'SELECT * FROM Tarea WHERE id = ?';
    const mockRow = { id: 1, titulo: 'Tarea' };

    cargarSQLPorNombre.mockReturnValue(mockSQL);
    db.get.mockImplementation((sql, params, callback) => {
      callback(null, mockRow);
    });

    const result = await tareaservicio.obtenerTarea(1);
    expect(result).toEqual(mockRow);
  });

// Test de OBTENER TAREAS POR USUARIO
  test('obtenerTareasPorUsuario devuelve lista de tareas', async () => {
    const mockSQL = 'SELECT * FROM Tarea WHERE id_usuario = ?';
    const mockRows = [{ id: 1 }, { id: 2 }];

    cargarSQLPorNombre.mockReturnValue(mockSQL);
    db.all.mockImplementation((sql, params, callback) => {
      callback(null, mockRows);
    });

    const result = await tareaservicio.obtenerTareasPorUsuario(1);
    expect(result).toEqual(mockRows);
  });

// Test ACTUALIZAR TAREA
  test('actualizarTarea actualiza correctamente', async () => {
  db.run.mockImplementation(function (sql, params, callback) {
    this.changes = 1;
    callback.call(this, null);
  });

  const result = await tareaservicio.actualizarTarea(1, 'Nuevo título', 'Desc', true);
  expect(result).toBe(true);
});

// Test NO ACTUALIZAR SI NO SE HACE NADA
  test('actualizarTarea no hace nada si no hay cambios', async () => {
    const result = await tareaservicio.actualizarTarea(1);
    expect(result).toBe(false);
  });

// Test ELIMINAR TAREA
  test('eliminarTarea elimina correctamente', async () => {
  const mockSQL = 'DELETE FROM Tarea WHERE id = ?';

  cargarSQLPorNombre.mockReturnValue(mockSQL);
  db.run.mockImplementation(function (sql, params, callback) {
    this.changes = 1;
    callback.call(this, null);
  });

  const result = await tareaservicio.eliminarTarea(1);
  expect(result).toBe(true);
});

});
