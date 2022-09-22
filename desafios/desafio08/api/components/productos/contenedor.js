class PrdContenedor {
    constructor(options) {
        this.knex = require('knex')(options);
    }

    async getAll() {
        return this.knex.from('productos').select('*');
    }

    async getById(id) {
        return this.knex.from('productos').select('*').where('id', id);
    }

    async save(producto) {
        return this.knex('productos').insert(producto);
    }

    async update(producto) {
        return this.knex('productos').update(producto).where("id", producto.id);
    }

    async deleteById(id) {
        return knex.from('productos').where('id', id).del();
    }

    async destroy() {
        this.knex.destroy();
    }
}

module.exports = {PrdContenedor};