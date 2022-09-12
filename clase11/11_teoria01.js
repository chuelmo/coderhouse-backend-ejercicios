const express = require('express');
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor');

    socket.on('notificacion', data => {
        console.log(data);
        io.sockets.emit('mensajes', data);
    });
});




const connectedServer = httpServer.listen(PORT, () => {
   console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

connectedServer.on("error", error => console.log(error));
