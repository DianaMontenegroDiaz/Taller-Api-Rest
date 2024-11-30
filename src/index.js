const app = require("../src/app"); // Importa la aplicación Express desde app.js

// Define el puerto en el que se ejecutará el servidor
const PORT = 4000;

// Inicia el servidor y muestra un mensaje en la consola cuando se haya iniciado correctamente

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});



/// a ver si sale 