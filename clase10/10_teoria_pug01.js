const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/hello', (req, res) => {
    res.render('hello.pug', {mensaje: 'Usando PUG en servidor Express'});
});

app.listen(9191, () => {
    console.log('Server listening on port 9191');
});