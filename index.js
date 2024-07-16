const express = require("express");
const server = express();

//Pruebo con un json
const data = require("./productos.json");

// ruta principal de nuestro servidor web Express

server.get("/", (req, res) => {
  console.log(req);
  res.send("<H1>Api Server Funcionando</H1>");
});

server.get("/productos", (req, res) => {
  console.log(req);
  res.json(data);
});

server.listen(3000, () => {
  console.log("Server Run: http://localhost:3000");
});
