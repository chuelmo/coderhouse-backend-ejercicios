const express = require('express');
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const {productos} = require('./routes/api/productos');
const {mensajes, recoveryMessages} = require('./routes/api/mensajes');
const router = express.Router();
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
   let hayProductos = productos.length > 0 ? true : false;
   let hayMensajes = mensajes.length > 0 ? true : false;
   res.render('ingreso.pug', {title: 'Ingreso de Productos', hayProductos: hayProductos, productos: productos, hayMensajes: hayMensajes, mensajes: mensajes});
});

app.get('/acercade', (req, res) => {
   res.render('acercade.pug', {title: 'Desafío 6'});
});

app.get('/productos', (req, res) => {
   let hayProductos = productos.length > 0 ? true : false;
   res.render('listar.pug', {hayProductos: hayProductos, productos: productos});
});

io.on("connection", async (socket) => {
   console.log("Nuevo cliente conectado");
   await recoveryMessages();
   socket.emit('all_messages', mensajes);
   socket.emit('all_productos', productos);
   
   socket.on('new-message', () => {
       io.sockets.emit('all_messages', mensajes);
   });

   socket.on('new-product', () => {
      io.sockets.emit('all_productos', productos);
  });
   
});

const connectedServer = httpServer.listen(PORT, () => {
   console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

connectedServer.on("error", error => console.log(error));
