import request from 'supertest';
import app from '../index.js'; // Asegúrate de que exportas `app` en tu `index.js`

describe('Pruebas unitarias para la API', () => {
    // Prueba para GET /todos
    it('Debe obtener todos los datos de la base de datos', async () => {
        const response = await request(app).get('/todos');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('clientes');
        expect(response.body).toHaveProperty('productos');
        expect(response.body).toHaveProperty('carrito');
    });

    // Prueba para POST /clientes
    it('Debe agregar un nuevo cliente', async () => {
        const nuevoCliente = {
            nombre_cliente: 'Juan Pérez',
            direccion_cliente: 'Calle 10 #20-30',
            celular_cliente: '3001234567'
        };

        const response = await request(app)
            .post('/clientes')
            .send(nuevoCliente);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id_cliente');
        expect(response.body.nombre_cliente).toBe(nuevoCliente.nombre_cliente);
    });

    // Prueba para PATCH /clientes/:id_cliente
    it('Debe actualizar parcialmente un cliente', async () => {
        const updates = { nombre_cliente: 'Juan Actualizado' };

        const response = await request(app)
            .patch('/clientes/1') // Cambia el ID según los datos en tu base
            .send(updates);

        expect(response.statusCode).toBe(200);
        expect(response.body.nombre_cliente).toBe(updates.nombre_cliente);
    });

    // Prueba para DELETE /clientes/:id_cliente
    it('Debe eliminar un cliente', async () => {
        const response = await request(app).delete('/clientes/1'); // Cambia el ID según los datos en tu base
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Cliente eliminado');
    });
});
