const fs = require('fs');
const FILE = __dirname + '/../../../../DB/productos.json';

module.exports = function() {
    async function getAll() {
        const content = await fs.promises.readFile(FILE, 'utf-8');
        const response = JSON.parse(content);
        return response;
    }

    async function getById(id) {
        const content = await getAll();
        const item = content.filter(item => item.id == id);
        if (item.length === 0) {
            return null;
        }
        return item[0];
    }

    async function save(item) {
        const content = await getAll();
        const ids = content.map(item => item.id);
        const newItem = {...item};
        if (ids.length === 0) {
            newItem.id = 1;
        } else {
            newItem.id = Math.max(...ids) + 1;
        }
        content.push(newItem);
        await fs.promises.writeFile(FILE, JSON.stringify(content, null, 2));
        return newItem;
    }

    async function update(item) {
        const originalItem = await getById(item.id);
        if (originalItem) {
            originalItem.timestamp = Date.now();
            originalItem.nombre = item.nombre ? item.nombre : originalItem.nombre;
            originalItem.descripcion = item.descripcion ? item.descripcion : originalItem.descripcion;
            originalItem.codigo = item.codigo ? item.codigo : originalItem.codigo;
            originalItem.fotoUrl = item.fotoUrl ? item.fotoUrl : originalItem.fotoUrl;
            originalItem.precio = item.precio ? item.precio : originalItem.precio;
            originalItem.stock = item.stock ? item.stock : originalItem.stock;
            const allProducts = await getAll();
            const filterProducts = allProducts.filter(i => i.id !== originalItem.id);
            filterProducts.push(originalItem);
            await fs.promises.writeFile(FILE, JSON.stringify(filterProducts, null, 2));
            return originalItem;
        }
        return null;
    }

    async function deleteById(id) {
        const i = await getById(id);
        const content = await getAll();
        const items = content.filter(item => item.id != id);
        if (content.length !== items.length) {
            await fs.promises.writeFile(FILE, JSON.stringify(items, null, 2));
        }
        return i;
    }

    return {getAll, getById, save, update, deleteById};
}