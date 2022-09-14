const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

//El ejemplo elimina los autos cuyo precio es superior a 50000
knex.from('cars').where('price', '>', '50000').del()
    .then(() => console.log('Autos con precio mayor a 50000 fueron borrados!'))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    })