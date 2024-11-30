const request = require("supertest");
const app = require("./app");

describe("Pruebas de rutas en el servidor Express", () => {
  
  it("Debe retornar todos los clientes", async () => {
    const response = await request(app).get("/clientes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que la respuesta es un array
    expect(response.body.length).toBeGreaterThan(0); // Verifica que no esté vacío
  });

  it("Debe crear un nuevo cliente", async () => {
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

  it("Debe actualizar un cliente existente", async () => {
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

  it("Debe eliminar un cliente", async () => {
    const response = await request(app).delete("/clientes/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Cliente eliminado");
  });

  it("Debe retornar un cliente específico", async () => {
    const response = await request(app).get("/clientes/5");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id_cliente: 5,
      nombre_cliente: "Pedro Paramo",
      direccion_cliente: "Calle 09 #10-17",
      celular_cliente: "3208865439",
    });
  });
});
