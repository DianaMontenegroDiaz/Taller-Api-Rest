const request = require("supertest");
const app = require("../src/app"); // Asegúrate de que la ruta sea correcta

describe("Pruebas de rutas para carritos en el servidor Express", () => {
  // Obtener todos los carritos
  it("Debe retornar todos los carritos", async () => {
    const response = await request(app).get("/carrito");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Obtener un carrito específico
  it("Debe retornar un carrito específico", async () => {
    const response = await request(app).get("/carrito/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id_carrito: 2,
      id_cliente: 3,
      productos: [
        {
          id_producto: 4,
          nombre_producto: "Teclado Mecánico",
          cantidad: 1,
          precio_unitario: 350000,
        },
        {
          id_producto: 5,
          nombre_producto: "Camara de Seguridad",
          cantidad: 1,
          precio_unitario: 350000,
        },
      ],
    });
  });

  // Crear un nuevo carrito
  it("Debe crear un nuevo carrito", async () => {
    const newCarrito = {
      id_cliente: 4,
      productos: [
        {
          id_producto: 6,
          nombre_producto: "Mouse",
          cantidad: 2,
          precio_unitario: 70000,
        },
      ],
    };

    const response = await request(app)
      .post("/carrito")
      .send(newCarrito);

    expect(response.status).toBe(201);
    expect(response.body.id_cliente).toBe(newCarrito.id_cliente);
    expect(response.body.productos).toEqual(newCarrito.productos);
    expect(response.body).toHaveProperty("id_carrito");
  });

  // Actualizar un carrito
  it("Debe actualizar un carrito existente", async () => {
    const updatedCarrito = {
      id_cliente: 5,
      productos: [
        {
          id_producto: 8,
          nombre_producto: "Impresora",
          cantidad: 1,
          precio_unitario: 600000,
        },
      ],
    };

    const response = await request(app)
      .put("/carrito/2")
      .send(updatedCarrito);

    expect(response.status).toBe(200);
    expect(response.body.id_cliente).toBe(updatedCarrito.id_cliente);
    expect(response.body.productos).toEqual(updatedCarrito.productos);
  });

  // Eliminar un carrito
  it("Debe eliminar un carrito", async () => {
    const response = await request(app).delete("/carrito/2");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Carrito eliminado");
  });

  // Intentar obtener un carrito inexistente
  it("Debe retornar 404 para un carrito inexistente", async () => {
    const response = await request(app).get("/carrito/999");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Carrito no encontrado");
  });
});
