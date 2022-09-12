/*
Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y reflejados por debajo del elemento de entrada de texto cada vez que el usuario haga un envío. La estructura de almacenamiento será un array de objetos, donde cada objeto tendrá la siguiente estructura:
{ socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

Cada cliente que se conecte recibirá la lista de mensajes completa.
Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.
Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id.

*/
const express = require("express");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));
const messages = [];

io.on("connection", socket => {
    console.log("Nuevo cliente conectado");
    socket.emit('new-chat-message', messages);
    socket.on('new-message', (msg) => {
        messages.push(msg);
        io.sockets.emit('new-chat-message', messages);
    });
});

const connectedServer = httpServer.listen(9191, () => {
    console.log("Servidor http con web sockets escuchando en 9191");
});

connectedServer.on("error", error => console.log(error));