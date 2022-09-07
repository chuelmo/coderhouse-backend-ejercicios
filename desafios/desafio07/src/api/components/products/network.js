const express = require('express');
const router = express.Router();
const { checkRouteProducts } = require('../../../auth');
const Controller = require('./controller');
const { Producto } = require('./model');

router.use(checkRouteProducts);
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', verifyParams, save);
router.delete('/:id', deleteById);
router.put('/:id', verifyParamsUpdate, update);

async function getAll(req, res) {
    try {
        const products = await Controller().getAll();
        if (products.length === 0) {
            res.status(200).json({ error : 'producto no encontrado' });
        } else {
            res.status(200).json(products);
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function getById(req, res) {
    try {
        const product = await Controller().getById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(200).json({ error : 'producto no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function save(req, res) {
    try {
        let timestamp = Date.now();
        let desc = req.body.descripcion ? req.body.descripcion : '';
        let fotoUrl = req.body.fotoUrl ? req.body.fotoUrl : 'https://cdn2.iconfinder.com/data/icons/gentle-edges-icon-set/128/Iconfinder_0042_4.png';
        let p = new Producto(0, timestamp, req.body.nombre, desc, req.body.codigo, fotoUrl, req.body.precio, req.body.stock);
        const product = await Controller().save(p);
        res.status(200).json(product);
    } catch (e) {
        res.status(500).send();
    }
}

async function deleteById(req, res) {
    try {
        const product = await Controller().deleteById(req.params.id);
        if (product) {
            res.status(200).json({'deleted': true, 'producto': product});
        } else {
            res.status(200).json({ error : 'producto no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function update(req, res) {
    try {
        const product = await Controller().getById(req.params.id);
        if (product) {
            let p = new Producto(
                parseInt(req.params.id), 0, req.body.nombre,
                req.body.descripcion, req.body.codigo, req.body.fotoUrl,
                req.body.precio, req.body.stock
                );
            console.log(p);
            const prodUpdated = await Controller().update(p);
            res.status(200).json(prodUpdated);
        } else {
            res.status(200).json({ error : 'producto no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

function verifyParams(req, res, next) {
    if (req.body.nombre && req.body.codigo && req.body.precio && req.body.stock) {
        if (isNaN(req.body.precio) || isNaN(req.body.stock)) {
            res.status(400).json({"error": "La petición no es correcta"});
        } else {
            next();
        }
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
}

function verifyParamsUpdate(req, res, next) {
    let campos = (req.body.precio || req.body.stock || req.body.nombre || req.body.fotoUrl || req.body.codigo || req.body.descripcion)
    if (campos) {
        if ((req.body.precio && isNaN(req.body.precio)) || (req.body.stock && isNaN(req.body.stock))) {
            res.status(400).json({"error": "La petición no es correcta"});
        } else {
            next();
        }
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
}

module.exports = router;