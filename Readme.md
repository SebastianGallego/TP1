# API de Productos Decathlon

Esta API proporciona un conjunto de endpoints para interactuar con la base de datos de productos de Decathlon.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB

## Instalación

Para ejecutar esta API localmente, sigue estos pasos:

1. Clona el repositorio:
   git clone url-del-repositorio

2. Instala las dependencias:
   npm install

3. Inicia el servidor:
   npm start

## Endpoints

### Obtener Todos los Productos

- **GET** `/`

Devuelve todos los productos disponibles en la base de datos.

### Obtener Producto por ID

- **GET** `/:id`

Obtiene un producto específico por su ID.

### Filtrar Productos por Nombre

- **GET** `/producto/:title`

Filtra los productos por su nombre.

## Conexión a la Base de Datos

La API se conecta a MongoDB utilizando las funciones `connectToMongoDB` y `disconnectToMongoDB` definidas en `config/mongodb.js`.

## Contribuir

Para contribuir a este proyecto, por favor crea un fork y envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
