const request = require('supertest');
const express = require('express');
const tareaRouter = require('../Routes/tareaRuta');
const tareaServicio = require('../servicios/tareaservicio.js');

// Crea una app express para testear
const app = express();
app.use(express.json());
app.use('/tareas', tareaRouter);

// Mock(simula) de las funciones del servicio
jest.mock('../servicios/tareaservicio.js');

describe('Rutas de tareas', () => {
    beforeEach(() => {
        jest.clearAllMocks();
});


// TEST 1 : Crear Tarea con Exito
test('POST /tareas - crear tarea', async () => {
    tareaServicio.crearTarea.mockResolvedValue(1);

    const response = await request(app)
        .post('/tareas')
        .send({ id_usuario: 2, titulo: 'Test Tarea', descripcion: 'Desc' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        id: 1,
        id_usuario: 2,
        titulo: 'Test Tarea',
        descripcion: 'Desc',
    });
});


// TEST 2 : Obtener Tarea con exito
test('GET /tareas/:id - obtener tarea', async () => {
    tareaServicio.obtenerTarea.mockResolvedValue({
        id: 1,
        titulo: 'Test',
        descripcion: 'Algo',
        completada: false,
    });

    const res = await request(app).get('/tareas/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('titulo');
});


// TEST 3 : Obtener Tarea Fallido - Tarea no Encontrada
test('GET /tareas/:id - tarea no encontrada', async () => {
    tareaServicio.obtenerTarea.mockResolvedValue(null);

    const res = await request(app).get('/tareas/999');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Tarea no encontrada');
});

// TEST 4 : Obtener Tareas Por Usuario Con EXito
test('GET /tareas/usuario/:id_usuario - obtener tareas por usuario', async () => {
    tareaServicio.obtenerTareasPorUsuario.mockResolvedValue([
    { id: 1, titulo: 'A', descripcion: 'B' },
    ]);

    const res = await request(app).get('/tareas/usuario/2');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});

// TEST 5 : Actualizar Tarea Con Exito
test('PUT /tareas/:id - actualizar tarea', async () => {
    tareaServicio.actualizarTarea.mockResolvedValue(true);

    const res = await request(app)
        .put('/tareas/1')
        .send({ titulo: 'Nuevo', descripcion: 'Cambio', completada: true });

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe('Tarea actualizada');
});

// TEST 6 : Actualizar Tarea Fallida - Tarea no Encontrada
test('PUT /tareas/:id - tarea no encontrada', async () => {
    tareaServicio.actualizarTarea.mockResolvedValue(false);

    const res = await request(app)
        .put('/tareas/999')
        .send({ titulo: 'X' });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Tarea no encontrada o sin cambios');
});

// TEST 7 : Eliminar Tarea Con Exito
test('DELETE /tareas/:id - eliminar tarea', async () => {
    tareaServicio.eliminarTarea.mockResolvedValue(true);

    const res = await request(app).delete('/tareas/1');

    expect(res.status).toBe(200);
    expect(res.body.mensaje).toBe('Tarea eliminada');
});

// TEST 8 : Eliminar Tarea Fallida - Tarea no existe
test('DELETE /tareas/:id - tarea no encontrada', async () => {
    tareaServicio.eliminarTarea.mockResolvedValue(false);

    const res = await request(app).delete('/tareas/999');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Tarea no encontrada');
    });
});