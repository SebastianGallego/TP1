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

## Base de Datos

La base de datos está creada a partir de un archivo json utilizado en el trabajo practico de JavaScript de la Diplomatura en Frontend
Escructura del json:

{
"id": 2,
"title": "Camiseta de montaña y trekking manga larga Hombre NH100",
"price": 14.99,
"brand": "Quechua",
"category":"Remeras",
"details": "Esta camiseta de manga larga ha sido diseñada, de forma sostenible, para tus rutas por la naturaleza o tu día a día con tiempo fresco.",
"color": "Azul",
"thumbnailUrl": "https://contents.mediadecathlon.com/p2350580/k$d42d1d38e11218191d78c205941e3dc8/sq/camiseta-de-montana-y-trekking-manga-larga-hombre-quechua-nh100.jpg?f=500x500",
"rating": 3
}

## Endpoints

### Obtener Todos los Productos

- **GET** `/productos`

Devuelve todos los productos disponibles en la base de datos.

### Obtener Producto por ID

- **GET** `/productos/:id`

Obtiene un producto específico por su ID.

### Filtrar Productos por Nombre

- **GET** `/productos/producto/:title`

Filtra los productos por su nombre.

### Filtrar Productos por Categoria

- **GET** `/productos/categoria/:category`

Filtra los productos por la categoria (Zapatillas, Mochilas, Pantalon, Remeras)

### Agregar un Producto Nuevo

- **POST** `/productos/`

Agrega un producto nuevo en la coleccion

### Actualizar precio de un producto por medio de su Id

- **PATCH** `/productos/:id`

Actualizar precio de un producto por medio de su Id

### Eliminar un producto por medio de su Id

- **DELETE** `/productos/:id`

Elimina un producto de la coleccion por medio de su Id

## Conexión a la Base de Datos

La API se conecta a MongoDB utilizando las funciones `connectToMongoDB` y `disconnectToMongoDB` definidas en `config/mongodb.js`.
