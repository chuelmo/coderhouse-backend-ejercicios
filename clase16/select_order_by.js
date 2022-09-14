const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

//Acá se seleccionan todos los coches y se ordenan por precio en orden descendente.
knex.from('cars').select('name', 'price').orderBy('price', 'desc')
    .then((rows) => {
        for (row of rows) {
            console.log(`${row['name']} ${row['price']}`);
        }
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    });