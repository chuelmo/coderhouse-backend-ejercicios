const router = require('express').Router();
const fs = require('fs');

const mensajes = [

];

async function recoveryMessages() {
    const content = await fs.promises.readFile('chat.txt', 'utf-8');
    const chat = JSON.parse(content);
    if (chat.length > 0) {
        while (mensajes.length > 0) mensajes.pop();
        chat.forEach((linea) => {
            mensajes.push(linea);
        });
    }
}

router.get('/', async (req, res) => {
    const content = await fs.promises.readFile('chat.txt', 'utf-8');
    const chat = JSON.parse(content);
    if (chat.length === 0) {
        res.status(200).json({ error : 'producto no encontrado' });
    } else {
        while (mensajes.length > 0) mensajes.pop();
        chat.forEach((linea) => {
            mensajes.push(linea);
        });
        res.status(200).json(chat);
    }
});

router.post('/', async (req, res) => {
    if (req.body.email && req.body.fecha && req.body.mensaje) {
        const m = {
            "email": req.body.email,
            "fecha": req.body.fecha,
            "mensaje": req.body.mensaje
        };
        mensajes.push(m);
        await fs.promises.writeFile('chat.txt', JSON.stringify(mensajes, null, 2));
        res.status(200).json(m);
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
});

module.exports = {
    router: router,
    mensajes: mensajes,
    recoveryMessages: recoveryMessages,
};