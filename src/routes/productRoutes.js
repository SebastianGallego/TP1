const express = require("express");
const router = express.Router();
const checkClient = require("../middlewares/checkClient");

const { connectToMongoDB, disconnectToMongoDB } = require("../config/mongodb");

// Devuelve todos los Productos
router.get("/", checkClient, async (req, res) => {
  const client = await connectToMongoDB();

  try {
    const productos = await client
      .db("decathlon")
      .collection("productos")
      .find()
      .toArray();
    if (productos.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos." });
    }
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  } finally {
    await disconnectToMongoDB();
  }
});

// Devuelve el producto por su id
router.get("/:id", checkClient, async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const productoId = parseInt(req.params.id) || 0;
  const producto = await db.collection("productos").findOne({ id: productoId });
  await disconnectToMongoDB();
  if (!producto) {
    return res.status(404).json({
      message: `No se encontraron productos con este id: ${productoId}`,
    });
  }
  res.json(producto);
});

// Filtrar Productos por nombre :nombre
router.get("/producto/:title", checkClient, async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const title = req.params.title;
  const productos = await db
    .collection("productos")
    .find({ title: title })
    .toArray();

  await disconnectToMongoDB();
  if (productos.length === 0) {
    return res.status(404).json({
      message: `No se encontraron productos con este titulo: ${title}`,
    });
  }
  res.json(productos);
});

// Filtrar Productos por categoria :category
router.get("/categoria/:category", checkClient, async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const category = req.params.category;
  const productos = await db
    .collection("productos")
    .find({ category: category })
    .toArray();

  await disconnectToMongoDB();
  if (productos.length === 0) {
    return res.status(404).json({
      message: `No se encontraron productos en esta categoria: ${category}`,
    });
  }
  res.json(productos);
});

// Agregar un nuevo producto
router.post("/", checkClient, async (req, res) => {
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
router.patch("/:id", checkClient, async (req, res) => {
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
router.delete("/:id", checkClient, async (req, res) => {
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
