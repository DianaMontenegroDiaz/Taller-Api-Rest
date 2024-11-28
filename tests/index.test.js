const request =require('supertest');
const app =require('../src/app');

describe('get/clientes',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/clientes');
        expect(response.text).toBe('Ejemplo de prueba unitaria');
});
    
});