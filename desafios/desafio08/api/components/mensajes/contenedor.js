class MsgContenedor {
    constructor(options) {
        this.knex = require('knex')(options);
    }

    async getAll() {
        return this.knex('mensajes').select('email', 'fecha', 'mensaje');
    }

    async save(mensaje) {
        return this.knex('mensaje').insert(mensaje);
    }

    async destroy() {
        this.knex.destroy();
    }
}

module.exports = {MsgContenedor};