const request = require("supertest");
const app = require("../src/app"); // Asegúrate de que la ruta sea correcta

describe("Pruebas de rutas para productos en el servidor Express", () => {
  // Prueba para obtener todos los productos
  it("Debe retornar todos los productos", async () => {
    const response = await request(app).get("/productos");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que la respuesta es un array
    expect(response.body.length).toBeGreaterThan(0); // Verifica que no esté vacío
  });

  // Prueba para obtener un producto específico
  it("Debe retornar un producto específico", async () => {
    const response = await request(app).get("/productos/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id_producto: 1,
      nombre_producto: "Mouse Pad",
      precio_producto: 20000,
    });
  });

  // Prueba para crear un nuevo producto
  it("Debe crear un nuevo producto", async () => {
    const newProduct = {
      nombre_producto: "Monitor 24 pulgadas",
      precio_producto: 500000,
    };

    const response = await request(app)
      .post("/productos")
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.nombre_producto).toBe(newProduct.nombre_producto);
    expect(response.body.precio_producto).toBe(newProduct.precio_producto);
    expect(response.body).toHaveProperty("id_producto");
  });

  // Prueba para actualizar un producto existente
  it("Debe actualizar un producto existente", async () => {
    const updatedProduct = {
      nombre_producto: "Monitor 24 pulgadas actualizado",
      precio_producto: 550000,
    };

    const response = await request(app)
      .put("/productos/1")
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body.nombre_producto).toBe(updatedProduct.nombre_producto);
    expect(response.body.precio_producto).toBe(updatedProduct.precio_producto);
  });

  // Prueba para eliminar un producto
  it("Debe eliminar un producto", async () => {
    const response = await request(app).delete("/productos/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Producto eliminado");
  });

  // Prueba para obtener un producto inexistente
  it("Debe retornar 404 para un producto inexistente", async () => {
    const response = await request(app).get("/productos/999");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Producto no encontrado");
  });
});
