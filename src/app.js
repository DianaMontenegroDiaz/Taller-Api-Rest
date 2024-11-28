const express = require("express");
const app = express();

app.get('/...', (req, res) => {
    res.send('Ejemplo de prueba unitaria');
});

app.get('/...', (req, res) => {
    res.send('Ejemplo 2 de prueba unitaria');
});

module.exports = app;