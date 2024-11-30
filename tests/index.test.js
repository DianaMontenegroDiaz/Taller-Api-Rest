const request =require('supertest');
const app =require('../src/app');

describe('get/clientes',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/clientes');
        expect(response.text).toBe('Ejemplo 1 de prueba unitaria');
        expect(response.body).toBe([
            { id_cliente: 5, nombre_cliente: "Pedro Paramo", direccion_cliente: "Calle 09 #10-17", celular_cliente: "3208865439" }
        ]);
});
    
});

