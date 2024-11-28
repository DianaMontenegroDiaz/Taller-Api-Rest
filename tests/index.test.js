const request = require('supertest');
const app = required ('../src/app');

describe('get/',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/...');
        expect(response.test).toBe('Ejemplo');
});
    
});