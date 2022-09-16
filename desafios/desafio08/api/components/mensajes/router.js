const router = require('express').Router();
const { options } = require('../../../config/sqliteDB');
const { MsgContenedor } = require('./contenedor');

router.get('/', getAll);
router.post('/', insertMensaje);

async function getAll(req, res) {
    try {
        const contenedor = new MsgContenedor(options);
        const mensajes = await contenedor.getAll();
        await contenedor.destroy();
        if (mensajes.length === 0) {
            res.status(200).json({ error : 'no hay mensajes' });
        } else {
            res.status(200).json(mensajes);
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function insertMensaje((req, res) {
    if (req.body.email && req.body.fecha && req.body.mensaje) {
        const m = {
            "email": req.body.email,
            "fecha": req.body.fecha,
            "mensaje": req.body.mensaje
        };
        const contenedor = new MsgContenedor(options);
        await contenedor.save(m);
        await contenedor.destroy();
        res.status(200).json(m);
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
});

module.exports = {
    router: router,
};