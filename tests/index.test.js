const request =require('supertest');
const app =require('../src/app');

describe('get/clientes',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/clientes');
        expect(response.text).toBe('Ejemplo de prueba unitaria');
});
    
});

describe('get/productos',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/productos');
        expect(response.text).toBe('Ejemplo 2 de prueba unitaria');
});
    
});

describe('get/clientes/:id_cliente',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/clientes/:id_cliente');
        expect(response.text).toBe('Ejemplo 3 de prueba unitaria');
});
    
});