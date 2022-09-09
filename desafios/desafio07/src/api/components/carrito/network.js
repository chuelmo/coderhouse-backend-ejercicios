const express = require('express');
const router = express.Router();
const { checkRouteCarrito } = require('../../../auth');
const Controller = require('./controller');
const { Carrito } = require('./model');

router.use(checkRouteCarrito);
router.get('/', getAllCarritos);
router.post('/', addCart);
router.delete('/:id', deleteCarritoById);
router.get('/:id/productos', getAll);
router.post('/:id/productos', verifyIdsProductos, addProductos);
router.delete('/:id/productos/:id_prod', delProductoById);

async function addCart(req, res) {
    try {
        let c = new Carrito();
        const id = await Controller().saveCarrito(c);
        res.status(200).json({"id": id});
    } catch (e) {
        res.status(500).send();
    }
}

async function deleteCarritoById(req, res) {
    try {
        const carrito = await Controller().deleteById(req.params.id);
        if (carrito) {
            res.status(200).json({'deleted': true, 'carrito': carrito});
        } else {
            res.status(200).json({ error : 'carrito no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function getAll(req, res) {
    try {
        const products = await Controller().getProductos(req.params.id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(200).json({ error : 'carrito no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function getAllCarritos(req, res) {
    try {
        const carritos = await Controller().getAllCarritos();
        if (carritos) {
            res.status(200).json(carritos);
        } else {
            res.status(200).json({ error : 'No hay carritos creados' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function addProductos(req, res) {
    try {
        ids = req.body.ids;
        const productos = await Controller().addProductos(req.params.id, ids);
        if (productos) {
            res.status(200).json(productos);
        } else {
            res.status(200).json({ error : 'carrito no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

async function delProductoById(req, res) {
    try {
        const producto = await Controller().delProductoById(req.params.id, req.params.id_prod);
        if (producto) {
            res.status(200).json({'deleted': true, 'carrito': req.params.id, 'producto': producto});
        } else {
            res.status(200).json({ error : 'carrito o producto no encontrado' });
        }
    } catch (e) {
        res.status(500).send();
    }
}

function verifyIdsProductos(req, res, next) {
    if (req.body.ids) {
        let ids = req.body.ids;
        if (Array.isArray(ids)) {
            next();
        } else {
            res.status(400).json({"error": "La petición no es correcta"});
        }
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
}

module.exports = router;