/*
Desarrollar un servidor basado en node.js, express y ejs que disponga de un formulario en su ruta raíz (creado con una plantilla de ejs) para ingresar los siguientes datos de una persona: nombre, apellido y edad. 
La información será enviada mediante el método post al endpoint '/personas
Representar por debajo del mismo formulario los datos históricos ingresados más el actual en forma de tabla. En el caso de no encontrarse información mostrar el mensaje 'No se encontraron datos' en lugar de la tabla.

Se sugiere el uso de bootstrap para los estilos de las plantillas. Ejemplos a continuación:
*/
const express = require('express');
const app = express();
const people = [
    {id:1, nombre: 'Juan', apellido: 'Perez', edad: 47},
    {id:2, nombre: 'Pedro', apellido: 'Ruiz', edad: 23}
];

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('personas.ejs', {personas: people});
});

const getMaxId = () => {
    const ids = people.map(person => person.id);
    if (ids.length === 0) {
        return 0;
    }
    return Math.max(...ids);
};

app.post('/personas', (req, res) => {
    if (req.body.nombre && req.body.apellido && req.body.edad) {
        const id = getMaxId() + 1;
        const p = {
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "edad": req.body.edad,
            "id": id
        };
        people.push(p);
        res.status(200).json(p);
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
});

app.listen(9191, () => {
    console.log('Servidor iniciado en 9191')
})