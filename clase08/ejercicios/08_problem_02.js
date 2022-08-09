/*
Partiendo del ejercicio anterior, generar una carpeta pública 'public' en el servidor, la cual tendrá un archivo index.html. 
En ese archivo se encontrarán dos formularios: uno que permita ingresar mascotas y otro personas utilizando el método post
Probar el ingreso de datos mediante los formularios y con Postman
Verificar los datos cargados en cada caso.

*/
const express = require('express');
const PORT = 8080;

const personas = [];
const mascotas = [];

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));
const router_persona = express.Router();
const router_mascota = express.Router();

router_persona.get('/', (req, res, next) => {
    res.status(200).json({ "personas": personas });
});

router_persona.post('/', (req, res, next) => {
    if (req.body.hasOwnProperty('persona')) {
        const p = req.body.persona;
        let isOk = p.hasOwnProperty('nombre') && p.hasOwnProperty('apellido') && p.hasOwnProperty('edad');
        if (isOk) {
            personas.push(p);
            res.status(200).json({"ok": 200});
        } else {
            res.status(400).json({ "error": "La persona no tiene los datos solicitados" });
        }
    } else {
        res.status(400).json({ "error": "La solicitud es incorrecta" });
    }
});

router_mascota.get('/', (req, res, next) => {
    res.status(200).json({ "mascotas": mascotas });
});

router_mascota.post('/', (req, res, next) => {
    if (req.body.hasOwnProperty('mascota')) {
        const m = req.body.mascota;
        let isOk = m.hasOwnProperty('nombre') && m.hasOwnProperty('raza') && m.hasOwnProperty('edad');
        if (isOk) {
            mascotas.push(m);
            res.status(200).json({"ok": 200});
        } else {
            res.status(400).json({ "error": "La mascota no tiene los datos solicitados" });
        }
    } else {
        res.status(400).json({ "error": "La solicitud es incorrecta" });
    }
});

app.use('/personas', router_persona);
app.use('/mascotas', router_mascota);
