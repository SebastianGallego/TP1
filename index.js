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

const PORT = process.env.PORT || 3000;

// ruta principal del servidor web Express
app.get("/", (req, res) => {
  res.status(200).end("Api Express");
});

app.listen(PORT, () => {
  console.log("Server Run: http://localhost:3000");
});

app.get("/productos", async (req, res) => {
  const client = await connectToMongoDB();
  const db = client.db("decathlon");
  const productos = await db.collection("productos").find().toArray();

  await disconnectToMongoDB();
  res.json(productos);
});
