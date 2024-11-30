const request = require("supertest");
const app = require("../src/app");

describe("Pruebas en el servidor Express", () => {
  
  it("Mostrar todos los clientes", async () => {
    const response = await request(app).get("/clientes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); 
  });

  it("Crear cliente", async () => {
    const newClient = {
      nombre_cliente: "Juan Pérez",
      direccion_cliente: "Calle 123",
      celular_cliente: "1234567890",
    };

    const response = await request(app)
      .post("/clientes")
      .send(newClient);

    expect(response.status).toBe(201);
    expect(response.body.nombre_cliente).toBe(newClient.nombre_cliente);
  });

  it("Actualizar cliente", async () => {
    const updateClient = {
      nombre_cliente: "Juan Pérez Actualizado",
      direccion_cliente: "Calle 456",
      celular_cliente: "0987654321",
    };

    const response = await request(app)
      .put("/clientes/1")
      .send(updateClient);

    expect(response.status).toBe(200);
    expect(response.body.nombre_cliente).toBe(updateClient.nombre_cliente);
  });

  it("Eliminar cliente", async () => {
    const response = await request(app).delete("/clientes/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Cliente eliminado");
  });

  it("Retornar cliente por Id", async () => {
    const response = await request(app).get("/clientes/4");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 4,
      nombre: "Juan Perez",
      direccion: "Calle 10 #10-17",
      celular: "3208865437",
    });
  });
});
