/*
>> Consigna:  
1) Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:
   a) Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
   b) Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
   c) Ambas páginas contarán con un botón que redirija a la otra. 
2) Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.
3) Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.
4) Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.
>> Aspectos a incluir en el entregable:
   - Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
   - En el caso de no encontrarse datos, mostrar el mensaje: 'No hay productos'.

>> Sugerencias:
   - Utilizar iconfinder (https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imagen -> copiar dirección de la imagen)

>> Opcional:
   - Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas y el formulario de ingreso de productos.
*/
const express = require('express');
const {productos} = require('./routes/api/productos');
const router = express.Router();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(require('./routes'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('ingreso.pug', {title: 'Ingreso de Productos'});
});

app.get('/productos', (req, res) => {
   let hayProductos = productos.length > 0 ? true : false;
   res.render('listar.pug', {hayProductos: hayProductos, productos: productos});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

