const express = require("express");
const app = express();


// Middleware para parsear JSON
app.use(express.json());

// Base de datos simulada en memoria
let clientes = [
  { id: 1, nombre: "Cliente 1", direccion: "Calle 123", celular: "1234567890" },
  { id: 2, nombre: "Cliente 2", direccion: "Calle 456", celular: "0987654321" },
  { id: 3, nombre: "Cliente 3", direccion: "Calle 572", celular: "3209034587" },
  { id: 4, nombre: "Cliente 4", direccion: "Carrera 456", celular: "3154218747" },
  { id: 5, nombre: "Pedro Paramo", direccion: "Calle 09 #10-17", celular: "3208865439" }

];

// Ruta GET: Obtener todos los clientes
app.get("/clientes", (req, res) => {
  res.status(200).json(clientes);
});

// Ruta GET: Obtener un cliente por ID
app.get("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find((cli) => cli.id === id);
  if (cliente) {
    res.status(200).json(cliente);
  } else {
    res.status(404).send("Cliente no encontrado");
  }
});

// Ruta POST: Crear un nuevo cliente
app.post("/clientes", (req, res) => {
  const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;

  const newClient = {
    id: Date.now(), // Usamos un ID ficticio para la demostración
    nombre_cliente,
    direccion_cliente,
    celular_cliente,
  };

  clientes.push(newClient); // Agrega el nuevo cliente al array de clientes

  res.status(201).json(newClient); // Responde con el cliente creado
});

// Ruta PUT: Actualizar completamente un cliente
app.put("/clientes/:id_cliente", (req, res) => {
  const { id_cliente } = req.params;
  const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;

  let client = clientes.find((c) => c.id == id_cliente);
  if (!client) return res.status(404).send("Cliente no encontrado");

  client.nombre_cliente = nombre_cliente;
  client.direccion_cliente = direccion_cliente;
  client.celular_cliente = celular_cliente;

  res.status(200).json(client); // Devuelve el cliente actualizado
});

// Ruta DELETE: Eliminar un cliente
app.delete("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const clientesFiltrados = clientes.filter((cli) => cli.id !== id);

  if (clientesFiltrados.length !== clientes.length) {
    clientes = clientesFiltrados;
    res.status(200).send("Cliente eliminado");
  } else {
    res.status(404).send("Cliente no encontrado");
  }
});

module.exports = app;
