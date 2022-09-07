const express = require('express');
const { api } = require('../config/app.js');
const networkProduct = require('./components/products/network');
const networkCart = require('./components/carrito/network');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../../public'));
app.use(api.basePath + '/productos', networkProduct);
app.use(api.basePath + '/carrito', networkCart);

const server = app.listen(api.port, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${api.port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));