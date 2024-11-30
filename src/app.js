const express = require("express");
const app = express();


// Middleware para parsear JSON
app.use(express.json());

// Base de datos simulada en memoria
let clientes = [
    { id: 1, nombre: "Cliente 1", direccion: "Calle 123", celular: "1234567890" },
    { id: 2, nombre: "Cliente 2", direccion: "Calle 456", celular: "0987654321" },
];

// Rutas
// Ruta GET: Obtener todos los clientes
app.get("/clientes", (req, res) => {
    res.status(200).json(clientes);

app.get('/clientes/5', (req, res) => {
    res.send('Ejemplo 1 de prueba unitaria');

});
})

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
app.post('/clientes', (req, res) => {
    const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;
  
    const newClient = {
      id: Date.now(), // Usamos un ID ficticio para la demostración
      nombre_cliente,
      direccion_cliente,
      celular_cliente,
    };
  
    // Deberías agregar el cliente al array de clientes en memoria o base de datos
    clients.push(newClient); // Asegúrate de tener la variable `clients` definida.
  
    // Responde con el cliente creado
    res.status(201).json(newClient);
  });
  

// Ruta PUT: Actualizar completamente un cliente
app.put('/clientes/:id_cliente', (req, res) => {
    const { id_cliente } = req.params;
    const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;
  
    // Busca al cliente por su ID
    let client = clients.find(c => c.id == id_cliente);
    if (!client) return res.status(404).send('Cliente no encontrado');
  
    // Actualiza los datos del cliente
    client.nombre_cliente = nombre_cliente;
    client.direccion_cliente = direccion_cliente;
    client.celular_cliente = celular_cliente;
  
    // Devuelve el cliente actualizado
    res.status(200).json(client);
  });
  

// Ruta PATCH: Actualizar parcialmente un cliente
app.patch("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, direccion, celular } = req.body;
    const cliente = clientes.find((cli) => cli.id === id);

    if (cliente) {
        if (nombre) cliente.nombre = nombre;
        if (direccion) cliente.direccion = direccion;
        if (celular) cliente.celular = celular;
        res.status(200).json(cliente);
    } else {
        res.status(404).send("Cliente no encontrado");
    }
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
