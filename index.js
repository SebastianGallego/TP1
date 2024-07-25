const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./src/routes/productRoutes");

app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset = utf8");
  next();
});

//// Middleware Para leer los json que llegan
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ruta principal del servidor web Express
app.get("/", (req, res) => {
  res.status(200).end("Api Express");
});

// Utilizar las rutas de productos
app.use("/productos", productRoutes);

app.listen(PORT, () => {
  console.log(`Server Funcionando: http://localhost:${PORT}`);
});
