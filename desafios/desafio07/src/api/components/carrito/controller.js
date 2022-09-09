const fs = require('fs');
const FILE = __dirname + '/../../../../DB/carrito.json';
const ControllerProduct = require('../products/controller');

module.exports = function() {
    async function getAllCarritos() {
        const content = await fs.promises.readFile(FILE, 'utf-8');
        const response = JSON.parse(content);
        return response;
    }

    async function getCarritoById(id) {
        const content = await getAllCarritos();
        const carrito = content.filter(c => c.id == id);
        if (carrito.length === 0) {
            return null;
        }
        return carrito[0];
    }

    async function saveCarrito(carrito) {
        const content = await getAllCarritos();
        const ids = content.map(c => c.id);
        const newCarrito = {...carrito};
        if (ids.length === 0) {
            newCarrito.id = 1;
        } else {
            newCarrito.id = Math.max(...ids) + 1;
        }
        content.push(newCarrito);
        await fs.promises.writeFile(FILE, JSON.stringify(content, null, 2));
        return newCarrito.id;
    }

    async function deleteById(id) {
        const c = await getCarritoById(id);
        const content = await getAllCarritos();
        const carritos = content.filter(cart => cart.id != id);
        if (content.length !== carritos.length) {
            await fs.promises.writeFile(FILE, JSON.stringify(carritos, null, 2));
        }
        return c;
    }

    async function getProductos(idCarrito) {
        const carrito = await getCarritoById(idCarrito);
        if (carrito) {
            return carrito.productos;
        }
        return null;
    }

    async function addProductos(idCarrito, idsProductos) {
        const carrito = await getCarritoById(idCarrito);
        const resultado = {"productos": [], "errores": [], "repetidos": []};
        if (carrito) {
            for (let i = 0; i < idsProductos.length; i++) {
                const producto = await ControllerProduct().getById(idsProductos[i]);
                if (producto) {
                    const checkIfExistsProductInCarrito = (p) => p.id == producto.id;
                    if (carrito.productos.some(checkIfExistsProductInCarrito)) {
                        resultado.repetidos.push(producto);
                    } else {
                        carrito.productos.push(producto);
                        resultado.productos.push(producto);
                    }
                } else {
                    resultado.errores.push({"id": idsProductos[i], "error": "Producto no existe"});
                }
            }
            if (resultado.productos.length > 0) {
                await deleteById(idCarrito);
                const content = await getAllCarritos();
                content.push(carrito);
                await fs.promises.writeFile(FILE, JSON.stringify(content, null, 2));
            }
            return resultado;
        }
        return null;
    }

    async function delProductoById(idCarrito, idProducto) {
        const carrito = await getCarritoById(idCarrito);
        if (carrito) {
            const producto = carrito.productos.find(p => p.id == idProducto);
            if (producto) {
                listaProductos = carrito.productos.filter(p => p.id != idProducto);
                await deleteById(idCarrito);
                const content = await getAllCarritos();
                const newCarrito = {...carrito, 'productos': listaProductos}
                content.push(newCarrito);
                await fs.promises.writeFile(FILE, JSON.stringify(content, null, 2));
                return producto;
            }
        }
        return null;
    }

    return {saveCarrito, deleteById, getProductos, addProductos, delProductoById, getAllCarritos};
}