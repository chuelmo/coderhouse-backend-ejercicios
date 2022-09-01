/* Ejemplo handlebars en Node.js (código de servidor)
*/

const express = require('express');
const engine = require('express-handlebars').engine;

const app = express();
const PORT = 9191;

app.use(express.static(__dirname + '/public'));
app.engine('.hbs', engine({extname: '.hbs', defaultLayout: 'index.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

fakeApi = () => [
    {name: 'Katarina', lane: 'midlaner'},
    {name: 'Jayce', lane: 'toplaner'},
    {name: 'Heimerdinger', lane: 'toplaner'},
    {name: 'Sophie', lane: 'midlaner'},
    {name: 'Azir', lane: 'midlaner'}
];

app.get('/', (req, res) => {
    //Sirve el cuerpo de la página "main.hbs" en el contenedor "index.hbs"
    res.render('main', {suggestedChamps: fakeApi(), listExists: true});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

