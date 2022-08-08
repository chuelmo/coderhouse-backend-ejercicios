/*
- Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', las cuales deben incluir métodos para listar y para agregar recursos:
	GET: devolverá la lista requerida en formato objeto.
POST: permitirá guardar una persona ó mascota en arrays propios en memoria, con el siguiente formato: 
Persona -> { "nombre": ..., "apellido": ..., "edad":... }
Mascota -> { "nombre":..., "raza":..., "edad":... }
- Utilizar el Router de express para definir las rutas base, implementando las subrutas en los métodos correspondientes.
- Probar la funcionalidad con Postman.
- El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.
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
app.use(express.urlencoded({ extended: true}));
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
            res.status(200).send();
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
            res.status(200).send();
        } else {
            res.status(400).json({ "error": "La mascota no tiene los datos solicitados" });
        }
    } else {
        res.status(400).json({ "error": "La solicitud es incorrecta" });
    }
});

app.use('/personas', router_persona);
app.use('/mascotas', router_mascota);
