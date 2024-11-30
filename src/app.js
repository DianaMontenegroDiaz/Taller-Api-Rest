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
//<<<<<<< HEAD
//=======

app.get('/clientes/5', (req, res) => {
    res.send('Ejemplo 1 de prueba unitaria');

//>>>>>>> 81d8641c3f4f3f5dfa9ec7d307890b9f0a48e5ce
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
app.post("/clientes", (req, res) => {
    const { nombre, direccion, celular } = req.body;
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre,
        direccion,
        celular,
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Ruta PUT: Actualizar completamente un cliente
app.put("/clientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, direccion, celular } = req.body;
    const clienteIndex = clientes.findIndex((cli) => cli.id === id);

    if (clienteIndex !== -1) {
        clientes[clienteIndex] = { id, nombre, direccion, celular };
        res.status(200).json(clientes[clienteIndex]);
    } else {
        res.status(404).send("Cliente no encontrado");
    }
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
