const express = require("express");
const app = express();

app.get('/clientes', (req, res) => {
    res.send('Ejemplo 1 de prueba unitaria');
});

app.get('/productos', (req, res) => {
    res.send('Ejemplo 2 de prueba unitaria');
});

app.get('/clientes/:id_cliente', (req, res) => {
    res.send('Ejemplo 3 de prueba unitaria');
});

app.get('/productos/:id_producto', (req, res) => {
    res.send('Ejemplo 4 de prueba unitaria');
});

app.get('/carrito', (req, res) => {
    res.send('Ejemplo 5 de prueba unitaria');
});

app.get('/carrito/:id_cliente', (req, res) => {
    res.send('Ejemplo 6 de prueba unitaria');
});

app.post('/clientes', (req, res) => {
    res.send('Ejemplo 7 de prueba unitaria');
});

module.exports = app;