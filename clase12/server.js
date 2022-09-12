/*
En base a lo desarrollado en clase, realizar una aplicación basada en node.js, express y websocket que permita generar un chat colaborativo entre usuarios conectados.
Cada usuario podrá ingresar su nombre y mensaje a través de un formulario y enviar la información utilizando el canal de websocket. 
Los mensajes serán presentados en tiempo real en cada uno de los clientes. 
Cuando un usuario nuevo se conecte, recibirá todos los mensajes hasta ahí ingresados. 
Los mensajes persistirán en memoria del servidor.

*/

const express = require("express");
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});


const connectedServer = httpServer.listen(9191, () => {
    console.log("Servidor http con web sockets escuchando en 9191");
});

connectedServer.on("error", error => console.log(error));