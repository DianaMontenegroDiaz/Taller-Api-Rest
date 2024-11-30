const request =require('supertest');
const app =require('../src/app');

describe('get/clientes/5',() => {

    it ('retornar un codigo 200', async () => {
        const response = await request(app).get('/clientes/5');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id_cliente: 5, 
            nombre_cliente: "Pedro Paramo", 
            direccion_cliente: "Calle 09 #10-17", 
            celular_cliente: "3208865439" 
        });
});
    
});

