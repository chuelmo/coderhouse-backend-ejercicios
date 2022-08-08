/*
Servidor con express

>> Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

Formato: link a un repositorio en Github y url de proyecto subido a glitch
Observación: no incluir la carpeta node_modules
[
 {
   "title": "Escuadra",
   "price": 123.45,
   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
   "id": 1
 },
 {
   "title": "Calculadora",
   "price": 234.56,
   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
   "id": 2
 },
 {
   "title": "Globo Terráqueo",
   "price": 345.67,
   "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
   "id": 3
 }
]
*/
const express = require('express');
const {Contenedor} = require('./contenedor');
const PORT = 8080;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));


app.get('/productos', async (req, res) => {
    try {
      const c = new Contenedor('productos.txt', ['title', 'price', 'thumbnail'], 'title');
      const allProducts = await c.getAll();
      res.json(allProducts);
    } catch (err) {
      console.log(err);
      res.status(500).send("Houston, we have a problem");
    }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const c = new Contenedor('productos.txt', ['title', 'price', 'thumbnail'], 'title');
    const allProducts = await c.getAll();
    const allIds = allProducts.map(item => item.id);
    if (allIds.length === 0) {
      res.send("Ups! parece que nos hemos quedado sin productos!");
    } else {
      const index = Math.floor(Math.random() * allIds.length);
      const oneProduct = await c.getById(allIds[index]);
      res.json(oneProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Houston, we have a problem");
  }
});

