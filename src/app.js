const express = require("express");
const app = express();

app.get('/clientes', (req, res) => {
    res.send('Ejemplo de prueba unitaria');
});

app.get('/productos', (req, res) => {
    res.send('Ejemplo 2 de prueba unitaria');
});

module.exports = app;