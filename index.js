const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

//Pruebo con un json
const data = require("./productos.json");

// ruta principal del servidor web Express

app.get("/", (req, res) => {
  console.log(req);
  res.send("<H1>Api Server Funcionando</H1>");
});

app.get("/productos", (req, res) => {
  console.log(req);
  res.json(data);
});

app.get("/contacto", (req, res) => {
  console.log(req);
  res.send("<H1>Llamame....</H1>");
});

app.listen(PORT, () => {
  console.log("Server Run: http://localhost:3000");
});
