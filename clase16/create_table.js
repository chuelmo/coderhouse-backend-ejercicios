const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

// Se crea una nueva tabla con la función createTable() del
// esquema de Knex.js
// Definimos el esquema para que contenga tres columnas:
//id, nombre y precio.

knex.schema.createTable('cars', table => {
    table.increments('id');
    table.string('name');
    table.integer('price');
})
    .then(() => console.log('Table created!'))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    });