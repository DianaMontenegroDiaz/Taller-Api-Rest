const express = require("express");
const app = express();

app.use(express.json());

// Base de datos clientes
let clientes = [
  { id: 1, nombre: "Diana Montenegro", direccion: "Calle 6 No. 5-20", celular: "1234567890" },
  { id: 2, nombre: "Carlos Escamilla", direccion: "Calle 456", celular: "0987654321" },
  { id: 3, nombre: "Salome Moreno", direccion: "Calle 572", celular: "3209034587" },
  { id: 4, nombre: "Juan Perez", direccion: "Calle 10 #10-17", celular: "3208865437" },
  { id: 5, nombre: "Pedro Paramo", direccion: "Calle 09 #10-17", celular: "3208865439" }
];

// Obtener todos los clientes
app.get("/clientes", (req, res) => {
  res.status(200).json(clientes);
});

// Obtener un cliente por ID
app.get("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find((cli) => cli.id === id);
  if (cliente) {
    res.status(200).json(cliente);
  } else {
    res.status(404).send("Cliente no encontrado");
  }
});

// Crear un nuevo cliente
app.post("/clientes", (req, res) => {
  const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;

  const newClient = {
    id: Date.now(), // Usamos un ID ficticio para la demostración
    nombre_cliente,
    direccion_cliente,
    celular_cliente,
  };

  clientes.push(newClient); // Agrega nuevo cliente 

  res.status(201).json(newClient); // Muestra el cliente creado
});

// Actualizar datos de un cliente
app.put("/clientes/:id_cliente", (req, res) => {
  const { id_cliente } = req.params;
  const { nombre_cliente, direccion_cliente, celular_cliente } = req.body;

  let client = clientes.find((c) => c.id == id_cliente);
  if (!client) return res.status(404).send("Cliente no encontrado");

  client.nombre_cliente = nombre_cliente;
  client.direccion_cliente = direccion_cliente;
  client.celular_cliente = celular_cliente;

  res.status(200).json(client); // Muestra los cambio del cliente actualizado
});

// Eliminar un cliente
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


let productos = [
  { id_producto: 1, nombre_producto: "Mouse Pad", precio_producto: 20000 },
  { id_producto: 2, nombre_producto: "Disco Duro 1TB", precio_producto: 300000 },
  { id_producto: 3, nombre_producto: "Teclado Mecánico", precio_producto: 350000 },
];

app.get("/productos", (req, res) => {
  res.status(200).json(productos);
});


app.get("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const producto = productos.find(p => p.id_producto === id);
  if (producto) {
    res.status(200).json(producto);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});


app.post("/productos", (req, res) => {
  const nuevoProducto = {
    id_producto: productos.length + 1,
    ...req.body,
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});


app.put("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const productoIndex = productos.findIndex(p => p.id_producto === id);

  if (productoIndex !== -1) {
    productos[productoIndex] = { id_producto: id, ...req.body };
    res.status(200).json(productos[productoIndex]);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});


app.delete("/productos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const productoIndex = productos.findIndex(p => p.id_producto === id);

  if (productoIndex !== -1) {
    productos.splice(productoIndex, 1);
    res.status(200).send("Producto eliminado");
  } else {
    res.status(404).send("Producto no encontrado");
  }
});



const carrito = [
  {
    id_carrito: 1,
    id_cliente: 3,
    productos: [
      {
        id_producto: 4,
        nombre_producto: "Teclado Mecánico",
        cantidad: 1,
        precio_unitario: 350000,
      },
    ],
  },
  {
    id_carrito: 2,
    id_cliente: 5,
    productos: [
      {
        id_producto: 4,
        nombre_producto: "Teclado Mecánico",
        cantidad: 1,
        precio_unitario: 350000,
      },
      {
        id_producto: 5,
        nombre_producto: "Camara de Seguridad",
        cantidad: 1,
        precio_unitario: 400000,
      },
    ],
  },
];


app.get("/carrito", (req, res) => {
  res.status(200).json(carrito);
});


app.get("/carrito/:id", (req, res) => {
  const carritoEncontrado = carrito.find((c) => c.id_carrito === parseInt(req.params.id));
  if (!carritoEncontrado) {
    return res.status(404).send("Carrito no encontrado");
  }
  res.status(200).json(carritoEncontrado);
});


app.post("/carrito", (req, res) => {
  const { id_cliente, productos } = req.body;

  if (!id_cliente || !productos || !Array.isArray(productos)) {
    return res.status(400).send("Datos incompletos o inválidos");
  }

  const nuevoCarrito = {
    id_carrito: carrito.length + 1,
    id_cliente,
    productos,
  };

  carrito.push(nuevoCarrito);
  res.status(201).json(nuevoCarrito);
});


app.put("/carrito/:id", (req, res) => {
  const carritoEncontrado = carrito.find((c) => c.id_carrito === parseInt(req.params.id));

  if (!carritoEncontrado) {
    return res.status(404).send("Carrito no encontrado");
  }

  const { id_cliente, productos } = req.body;

  if (!id_cliente || !productos || !Array.isArray(productos)) {
    return res.status(400).send("Datos incompletos o inválidos");
  }

  carritoEncontrado.id_cliente = id_cliente;
  carritoEncontrado.productos = productos;

  res.status(200).json(carritoEncontrado);
});


app.delete("/carrito/:id", (req, res) => {
  const carritoIndex = carrito.findIndex((c) => c.id_carrito === parseInt(req.params.id));

  if (carritoIndex === -1) {
    return res.status(404).send("Carrito no encontrado");
  }

  carrito.splice(carritoIndex, 1);
  res.status(200).send("Carrito eliminado");
});


module.exports = app;
