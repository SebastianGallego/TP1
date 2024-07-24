const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const {
  connectToMongoDB,
  disconnectToMongoDB,
} = require("./src/config/mongodb");

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset = utf8");
  next();
});

//Para leer los json que llegan
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ruta principal del servidor web Express
app.get("/", (req, res) => {
  res.status(200).end("Api Express");
});

app.listen(PORT, () => {
  console.log("Server Run: http://localhost:3000");
});

// Devuelve todos los Productos
app.get("/productos", async (req, res) => {
  const client = await connectToMongoDB();

  if (!client) {
    res.status(500).json({ error: "Error al conectar a la base de datos" });
    return;
  }

  const db = client.db("decathlon");
  const productos = await db.collection("productos").find().toArray();

  await disconnectToMongoDB();
  res.json(productos);
});

// Devuelve el producto de igual id
app.get("/productos/:id", async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const productoId = parseInt(req.params.id) || 0;
  const producto = await db.collection("productos").findOne({ id: productoId });

  await disconnectToMongoDB();
  res.json(producto);
});

// Agregar un producto
app.post("/productos", async (req, res) => {
  const producto = req.body;
  if (Object.keys(producto).length === 0) {
    res.status(422).send("No se recibió producto");
  }

  const client = await connectToMongoDB();

  if (!client) {
    res.status(500).json({ error: "Error al conectar a la base de datos" });
    return;
  }

  const collection = client.db("decathlon").collection("productos");
  collection
    .insertOne(producto)
    .then((response) => res.status(201).json(producto))
    .catch((error) => res.status(500).send("Error al guardar en la BD"))
    .finally(async () => {
      await disconnectToMongoDB();
    });
});

// Modificar un producto
app.put("/productos/:id", async (req, res) => {
  const producto = req.body;
  const productoId = parseInt(req.params.id) || 0;

  if (Object.keys(producto).length === 0) {
    res.status(422).send("No se recibió producto");
  }

  const client = await connectToMongoDB();

  if (!client) {
    res.status(500).json({ error: "Error al conectar a la base de datos" });
    return;
  }

  const collection = client.db("decathlon").collection("productos");
  collection
    .updateOne({ id: productoId }, { $set: producto })
    .then((response) => res.status(200).json(producto))
    .catch((error) => res.status(500).send("Error al guardar en la BD"))
    .finally(async () => {
      await disconnectToMongoDB();
    });
});

// Eliminar un producto
app.delete("/productos/:id", async (req, res) => {
  const productoId = parseInt(req.params.id) || 0;

  const client = await connectToMongoDB();

  if (!client) {
    res.status(500).json({ error: "Error al conectar a la base de datos" });
    return;
  }

  const collection = client.db("decathlon").collection("productos");
  collection
    .deleteOne({ id: productoId })
    .then((response) => {
      if (response.deletedCount === 0) {
        res
          .status(204)
          .json({ message: `Producto ID: ${productoId} no encontrado` });
        return;
      }
      res.status(202).json({ message: "Producto eliminado" });
    })
    .catch((error) => res.status(500).send("Error al guardar en la BD"))
    .finally(async () => {
      await disconnectToMongoDB();
    });
});
