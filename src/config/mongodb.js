require("dotenv").config();

const { MongoClient } = require("mongodb");

const URI = process.env.MONGODB_URI;

const client = new MongoClient(URI);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
    return client;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function disconnectToMongoDB() {
  try {
    await client.close();
    console.log("Desconectado de MongoDB");
    return client;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  connectToMongoDB,
  disconnectToMongoDB,
};
