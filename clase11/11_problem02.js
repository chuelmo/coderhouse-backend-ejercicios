/*
Sobre la estructura anteriormente creada, agregar en la vista de cliente un elemento de entrada de texto donde al introducir texto, el mensaje se vea reflejado en todos los clientes conectados en un párrafo por debajo del input.
El texto debe ser enviado caracter a caracter y debe reemplazar el mensaje previo.

*/
const express = require("express");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

io.on("connection", socket => {
    console.log("Nuevo cliente conectado");
    socket.on('mensajeEnviado', (msg) => {
        io.sockets.emit('mensajesRecibidos', msg);
    });
});

const connectedServer = httpServer.listen(9191, () => {
    console.log("Servidor http con web sockets escuchando en 9191");
});

connectedServer.on("error", error => console.log(error));