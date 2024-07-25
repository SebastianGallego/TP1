const express = require("express");
const router = express.Router();

const { connectToMongoDB, disconnectToMongoDB } = require("../config/mongodb");

// Devuelve todos los Productos
router.get("/", async (req, res) => {
  const client = await connectToMongoDB();

  if (!client) {
    res.status(500).json({ error: "Error al conectar a la base de datos" });
    return;
  }

  try {
    const productos = await client
      .db("decathlon")
      .collection("productos")
      .find()
      .toArray();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  } finally {
    await disconnectToMongoDB();
  }
});

// Devuelve el producto por su id
router.get("/:id", async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const productoId = parseInt(req.params.id) || 0;
  const producto = await db.collection("productos").findOne({ id: productoId });

  await disconnectToMongoDB();
  res.json(producto);
});

// Filtrar Productos por nombre :nombre
router.get("/producto/:title", async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const title = req.params.title;
  const productos = await db
    .collection("productos")
    .find({ title: title })
    .toArray();

  await disconnectToMongoDB();
  res.json(productos);
});

// ++ Filtrar Productos por categoria :nombre
router.get("/categoria/:category", async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const category = req.params.category;
  const productos = await db
    .collection("productos")
    .find({ category: category })
    .toArray();

  await disconnectToMongoDB();
  res.json(productos);
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
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

// Actualizar precio de un producto
router.patch("/:id", async (req, res) => {
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

// Eliminar un producto por su Id
router.delete("/:id", async (req, res) => {
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

module.exports = router;
