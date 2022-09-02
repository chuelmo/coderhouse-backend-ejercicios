/*
Realizar un servidor que reciba por query params (mediante la ruta get '/datos') el valor que debe representar una barra de medición (usando el tag de html meter). 
Asimismo recibirá además los valores mínimos y máximos permitidos y el título que se pondrá por arriba de la barra, en un elemento h1 en color azul (debe permitir formato HTML).

Ejemplo de petición:
http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>

Como respuesta a este request, el servidor devolverá al frontend una plantilla armada con los datos recibidos.
Utilizar EJS integrado a express, manejando una plantilla común y una particular con la representación requerida.

*/
const express = require('express')

const app = express()
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/hello', (req, res) => {
    res.render('hello.ejs', {mensaje: 'Hola Mundo de PUG!'})
})

app.get('/datos', (req, res) => {
    let value = req.query.value ? req.query.value : 20;
    let max = req.query.max ? req.query.max : 50;
    let min = req.query.min ? req.query.min : 10;
    let title = req.query.title ? req.query.title : 'Usando plantillas EJS';
    console.log('title ', title, 'max ', max, 'min ', min, 'value ', value)
    res.render('meter.ejs', {value: value, min: min, max: max, title: title})
})

app.listen(9191, () => {
    console.log('Servidor iniciado en 9191')
})
