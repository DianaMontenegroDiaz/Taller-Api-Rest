const express = require("express");
const app = express();

app.get('/clientes/5', (req, res) => {
    res.send('Ejemplo 1 de prueba unitaria');
});


module.exports = app;