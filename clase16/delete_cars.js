const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

//El ejemplo elimina todos los autos.
knex.from('cars').del()
    .then(() => console.log('All cars deleted!'))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    })