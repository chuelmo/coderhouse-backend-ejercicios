/*
Desarrollar un servidor basado en express que tenga integrado Websocket. Con cada conexión de cliente, el servidor debe emitir por consola en mensaje: '¡Nuevo cliente conectado!'

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
});

const connectedServer = httpServer.listen(9191, () => {
    console.log("Servidor http con web sockets escuchando en 9191");
});

connectedServer.on("error", error => console.log(error));