import express from 'express';
import fs from 'fs';
import path from 'path';

// Configuración del servidor Express
const app = express();
const PORT = 4000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Bienvenido al Proyecto!");
});

// Configuración de la base de datos (db.json)
const dbPath = path.join(process.cwd(), 'db.json');

// Funciones para leer y escribir en el archivo JSON
const readData = () => {
    try {
        const data = fs.readFileSync(dbPath);
        return JSON.parse(data);
    } catch (error) {
        return { clientes: [], productos: [], carrito: [] };
    }
};

const writeDatabase = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        console.log("Base de datos actualizada correctamente.");
    } catch (error) {
        console.error("Error al escribir en la base de datos:", error);
    }
};



//GET: Obtener todos los elementos de la base de datos
app.get("/todos", (req, res) => {
    const data = readData();
    res.json(data);
});


// GET: Obtener todos los clientes
app.get("/clientes", (req, res) => {
    const data = readData();
    res.json(data.clientes); // Esto devuelve solo los clientes
});

// GET: Obtener un cliente por ID
app.get("/clientes/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente); // Obtenemos el ID del cliente
    const data = readData();
    const cliente = data.clientes.find(cli => cli.id_cliente === id_cliente); // Buscamos el cliente por ID

    if (cliente) {
        res.json(cliente); // Si lo encontramos, devolvemos el cliente
    } else {
        res.status(404).send('Cliente no encontrado'); // Si no lo encontramos, enviamos un error
    }
});

// GET: Obtener todos los productos
app.get("/productos", (req, res) => {
    const data = readData();
    res.json(data.productos); // Esto devuelve solo los productos
});

// GET: Obtener un producto por ID
app.get("/productos/:id_producto", (req, res) => {
    const id_producto = parseInt(req.params.id_producto); // Obtenemos el ID del producto
    const data = readData();
    const producto = data.productos.find(prod => prod.id_producto === id_producto); // Buscamos el producto por ID

    if (producto) {
        res.json(producto); // Si lo encontramos, devolvemos el producto
    } else {
        res.status(404).send('Producto no encontrado'); // Si no lo encontramos, enviamos un error
    }
});


// GET: Obtener el carrito de un cliente
app.get("/carrito/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente); // Obtenemos el ID del cliente
    const data = readData();
    const carrito = data.carrito.find(car => car.id_cliente === id_cliente); // Buscamos el carrito del cliente por ID

    if (carrito) {
        res.json(carrito); // Si lo encontramos, devolvemos el carrito
    } else {
        res.status(404).send('Carrito no encontrado para este cliente'); // Si no lo encontramos, enviamos un error
    }
});


//POST: Agregar un nuevo cliente y un nuevo producto

app.post("/clientes", (req, res) => {
    const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;
    const data = readData();
    const newId = data.clientes.length ? data.clientes[data.clientes.length - 1].id_cliente + 1 : 1;
    
    const nuevoCliente = { id_cliente: newId, nombre_cliente, direccion_cliente, celular_cliente };
    data.clientes.push(nuevoCliente);
    writeDatabase(data);
    
    res.status(201).json(nuevoCliente);
});



// POST: Agregar un nuevo producto
app.post("/productos", (req, res) => {
    const { nombre_producto, precio_producto } = req.body;
    const data = readData();
    const newId = data.productos.length ? data.productos[data.productos.length - 1].id_producto + 1 : 1;

    const nuevoProducto = { id_producto: newId, nombre_producto, precio_producto };
    data.productos.push(nuevoProducto);
    writeDatabase(data);

    res.status(201).json(nuevoProducto);
});



//PUT: Completar los campos vacíos de la base de datos

app.put("/clientes/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente);
    const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;
    const data = readData();
    const clienteIndex = data.clientes.findIndex(cli => cli.id_cliente === id_cliente);

    if (clienteIndex !== -1) {
        data.clientes[clienteIndex] = { ...data.clientes[clienteIndex], nombre_cliente, direccion_cliente, celular_cliente };
        writeDatabase(data);
        res.json(data.clientes[clienteIndex]);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

app.put("/productos/:id_producto", (req, res) => {
    const id_producto = parseInt(req.params.id_producto);
    const {nombre_producto, precio_producto} = req.body;
    const data = readData();
    const productoIndex = data.productos.findIndex(prod => prod.id_producto === id_producto);

    if (productoIndex !== -1) {
        data.productos[productoIndex] = { ...data.productos[productoIndex], nombre_producto,precio_producto };
        writeDatabase(data);
        res.json(data.productos[productoIndex]);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

//PATCH: Actualizar parcialmente el id_cliente
app.patch("/clientes/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente);
    const { nombre_cliente } = req.body;
    const data = readData();
    const cliente = data.clientes.find(cli => cli.id_cliente === id_cliente);

    if (cliente) {
        cliente.nombre_cliente = nombre_cliente || cliente.nombre_cliente;
        writeDatabase(data);
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});


//DELETE: Eliminar un producto, carrito o cliente

app.delete("/clientes/:id_cliente", (req, res) => {
    const id_cliente = parseInt(req.params.id_cliente);
    const data = readData();
    const newClientes = data.clientes.filter(cli => cli.id_cliente !== id_cliente);
    
    if (newClientes.length !== data.clientes.length) {
        data.clientes = newClientes;
        writeDatabase(data);
        res.status(200).send("Cliente eliminado");
    } else {
        res.status(404).send("Cliente no encontrado");
    }
});

// Eliminar un producto
app.delete("/productos/:id_producto", (req, res) => {
    const id_producto = parseInt(req.params.id_producto);
    const data = readData();
    const newProductos = data.productos.filter(prod => prod.id_producto !== id_producto);
    
    if (newProductos.length !== data.productos.length) {
        data.productos = newProductos;
        writeDatabase(data);
        res.status(200).send("Producto eliminado");
    } else {
        res.status(404).send("Producto no encontrado");
    }
});



// Obtener todos los carritos
app.get("/carrito", (req, res) => {
    const data = readData();
    res.json(data.carrito);
});

// Crear un nuevo carrito o agregar productos a un carrito existente
app.post("/carrito", (req, res) => {
    const { id_cliente, productos } = req.body;
    const data = readData();
    
    // Buscar si el cliente ya tiene un carrito
    let carrito = data.carrito.find(c => c.id_cliente === id_cliente);

    if (carrito) {
        // Agregar productos al carrito existente
        productos.forEach(producto => {
            const productoExistente = carrito.productos.find(p => p.id_producto === producto.id_producto);
            if (productoExistente) {
                productoExistente.cantidad += producto.cantidad; // Actualizar cantidad
            } else {
                carrito.productos.push(producto); // Agregar nuevo producto
            }
        });
    } else {
        // Crear un nuevo carrito
        const newIdCarrito = data.carrito.length ? data.carrito[data.carrito.length - 1].id_carrito + 1 : 1;
        const nuevoCarrito = {
            id_carrito: newIdCarrito,
            id_cliente,
            productos
        };
        data.carrito.push(nuevoCarrito);
    }

    writeDatabase(data);
    res.status(201).json({ message: "Carrito actualizado o creado con éxito." });
});

// Actualizar productos en un carrito
app.put("/carrito/:id_carrito", (req, res) => {
    const id_carrito = parseInt(req.params.id_carrito);
    const { productos } = req.body;
    const data = readData();
    
    const carrito = data.carrito.find(c => c.id_carrito === id_carrito);

    if (carrito) {
        // Reemplazar los productos en el carrito
        carrito.productos = productos;
        writeDatabase(data);
        res.json({ message: "Carrito actualizado.", carrito });
    } else {
        res.status(404).send("Carrito no encontrado.");
    }
});

// Eliminar un producto de un carrito
app.delete("/carrito/:id_carrito/producto/:id_producto", (req, res) => {
    const id_carrito = parseInt(req.params.id_carrito);
    const id_producto = parseInt(req.params.id_producto);
    const data = readData();

    const carrito = data.carrito.find(c => c.id_carrito === id_carrito);

    if (carrito) {
        carrito.productos = carrito.productos.filter(p => p.id_producto !== id_producto);
        writeDatabase(data);
        res.json({ message: "Producto eliminado del carrito.", carrito });
    } else {
        res.status(404).send("Carrito no encontrado.");
    }
});

// Eliminar un carrito completo
app.delete("/carrito/:id_carrito", (req, res) => {
    const id_carrito = parseInt(req.params.id_carrito);
    const data = readData();

    const carritosRestantes = data.carrito.filter(c => c.id_carrito !== id_carrito);

    if (carritosRestantes.length !== data.carrito.length) {
        data.carrito = carritosRestantes;
        writeDatabase(data);
        res.json({ message: "Carrito eliminado." });
    } else {
        res.status(404).send("Carrito no encontrado.");
    }
});






app.listen(4000, () => {
    console.log("Servidor iniciado en el puerto 4000");
});
