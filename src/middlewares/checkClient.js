// middlewares/checkClient.js
const { connectToMongoDB } = require("../config/mongodb");

const checkClient = async (req, res, next) => {
  try {
    const client = await connectToMongoDB();
    if (!client) {
      return res
        .status(500)
        .json({ error: "Error al conectar a la base de datos" });
    }
    req.client = client;
    next();
  } catch (error) {
    res.status(500).json({ error: "Error al conectar a la base de datos" });
  }
};

module.exports = checkClient;
