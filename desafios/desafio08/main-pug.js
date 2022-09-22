const express = require('express');
const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");
const { PrdContenedor } = require('./api/components/productos/contenedor');
const { MsgContenedor } = require('./api/components/mensajes/contenedor');
const { options: optProd } = require('./config/mariaDB');
const { options: optMsg } = require('./config/sqliteDB');
const router = express.Router();
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', require('./api/components'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', async (req, res) => {
   let productos = await recoveryProductos();
   let mensajes = await recoveryMessages();
   let hayProductos = productos.length > 0 ? true : false;
   let hayMensajes = mensajes.length > 0 ? true : false;
   res.render('ingreso.pug', {title: 'Ingreso de Productos', hayProductos: hayProductos, productos: productos, hayMensajes: hayMensajes, mensajes: mensajes});
});

app.get('/acercade', (req, res) => {
   res.render('acercade.pug', {title: 'Desafío 8'});
});

app.get('/productos', async (req, res) => {
   let productos = await recoveryProductos();
   let hayProductos = productos.length > 0 ? true : false;
   res.render('listar.pug', {title: 'Listado de productos', hayProductos: hayProductos, productos: productos});
});

async function recoveryMessages() {
   const contenedor = new MsgContenedor(optMsg);
   const mensajes = await contenedor.getAll();
   await contenedor.destroy();
   return mensajes;
}

async function recoveryProductos() {
   const contenedor = new PrdContenedor(optProd);
   const productos = await contenedor.getAll();
   await contenedor.destroy();
   return productos;
}

io.on("connection", async (socket) => {
   console.log("Nuevo cliente conectado");
   let mensajes = await recoveryMessages();
   let productos = await recoveryProductos();
   socket.emit('all_messages', mensajes);
   socket.emit('all_productos', productos);
   
   socket.on('new-message', async () => {
      let mensajes = await recoveryMessages();
      io.sockets.emit('all_messages', mensajes);
   });

   socket.on('new-product', async () => {
      let productos = await recoveryProductos();
      io.sockets.emit('all_productos', productos);
  });
});

const connectedServer = httpServer.listen(PORT, () => {
   console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

connectedServer.on("error", error => console.log(error));
