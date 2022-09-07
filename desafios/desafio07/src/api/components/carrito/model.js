class Carrito {
    constructor() {
        this.id = 0;
        this.timestamp = Date.now();
        this.productos = [];
    }

    addProduct(producto) {
        this.productos.push(producto);
    }
}

module.exports = {Carrito};