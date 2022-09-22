const router = require('express').Router();
const { options } = require('../../../config/mariaDB');
const { PrdContenedor } = require('./contenedor');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', save);
router.put('/:id', update);
router.delete('/:id', deleteById);

async function getAll(req, res) {
    try {
        const contenedor = new PrdContenedor(options);
        const productos = await contenedor.getAll();
        await contenedor.destroy();
        console.log('productos en getAll: ', productos);
        if (productos.length === 0) {
            res.status(200).json({ error : 'no hay mensajes' });
        } else {
            res.status(200).json(productos);
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function getById(req, res) {
    if (isNaN(parseInt(req.params.id))) {
        res.status(400).json({"error": "El parámetro no es un número"});
    } else {
        const contenedor = new PrdContenedor(options);
        const producto = await contenedor.getById(parseInt(req.params.id));
        await contenedor.destroy();
        console.log('producto en getById: ', producto);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(200).json({ error : 'producto no encontrado' });
        }
    }
};

async function save(req, res) {
    if (req.body.title && req.body.price && req.body.thumbnail) {
        const p = {
            "title": req.body.title,
            "price": req.body.price,
            "thumbnail": req.body.thumbnail,
        };
        const contenedor = new PrdContenedor(options);
        const producto = await contenedor.save(p);
        await contenedor.destroy();
        console.log('producto en save: ', producto);
        res.status(200).json(producto);
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
};

async function update(req, res) {
    let reqOk = true;
    let msgError = '';
    let errorCode = 400;
    let producto = null;
    // Begin Check parameters
    if (isNaN(parseInt(req.params.id))) {
        reqOk = false;
        msgError = "El parámetro no es un número";
    } else {
        const contenedor = new PrdContenedor(options);
        producto = await contenedor.getById(parseInt(req.params.id));
        await contenedor.destroy();
        console.log('producto en update en getById: ', producto);
        if (!producto) {
            reqOk = false;
            msgError = "Producto no encontrado";
            errorCode = 200;
        } else if (!(req.body.title || req.body.price || req.body.thumbnail)) {
            reqOk = false;
            msgError = "La petición no es correcta";
        }
    }
    // end check parameters
    if (reqOk) {
        const newProduct = {
            "title": req.body.title ? req.body.title : producto.title,
            "price": req.body.price ? req.body.price : producto.price,
            "thumbnail": req.body.thumbnail ? req.body.thumbnail : producto.thumbnail,
            "id": producto.id
        };
        const contenedor = new PrdContenedor(options);
        const respuesta = await contenedor.update(newProduct);
        await contenedor.destroy();
        console.log('update respuesta: ', respuesta);
        res.status(200).json(newProduct);
    } else {
        res.status(errorCode).json({"error": msgError});
    }
};

async function deleteById(req, res) {
    if (isNaN(parseInt(req.params.id))) {
        res.status(400).json({"error": "El parámetro no es un número"});
    } else {
        const contenedor = new PrdContenedor(options);
        const producto = await contenedor.getById(parseInt(req.params.id));
        await contenedor.destroy();
        console.log('producto in deleteById: ', producto);
        if (producto) {
            const contenedor = new PrdContenedor(options);
            const borrado = await contenedor.deleteById(parseInt(req.params.id));
            await contenedor.destroy();
            console.log('borrado en deletebyid: ', borrado);
            res.status(200).json({ deleted: producto });
        } else {
            res.status(200).json({ error : 'producto no encontrado' });
        }
    }
};

module.exports = {
    router: router
};