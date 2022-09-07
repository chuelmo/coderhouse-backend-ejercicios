class Producto {
    constructor(id, timestamp, nombre, descripcion, codigo, fotoUrl, precio, stock) {
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.fotoUrl = fotoUrl;
        this.precio = precio;
        this.stock = stock;
    }
}

module.exports = {Producto};