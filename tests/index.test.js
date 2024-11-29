const request =require('supertest');
const app =require('../src/app');

describe('get/clientes',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/clientes');
        expect(response.text).toBe('Ejemplo 1 de prueba unitaria');
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

describe('get/productos/:id_producto',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/productos/:id_producto');
        expect(response.text).toBe('Ejemplo 4 de prueba unitaria');
});
    
});

describe('get/carrito',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/carrito');
        expect(response.text).toBe('Ejemplo 5 de prueba unitaria');
});
    
});

describe('get/carrito/:id_cliente',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/carrito/:id_cliente');
        expect(response.text).toBe('Ejemplo 6 de prueba unitaria');
});
    
});

describe('post/clientes',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).post('/clientes');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Ejemplo 7 de prueba unitaria');
});
    
});