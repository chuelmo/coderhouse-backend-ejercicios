const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

//El ejemplo actualiza coches cuyo precio es igual a 9000 con 9500
knex.from('cars').where('price', '9000').update({price: 9500})
    .then(() => console.log('Car updated!'))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    })