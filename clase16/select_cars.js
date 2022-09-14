const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

// Seleccionamos todos los registros con la función select().
// Hemos elegido la tabla con la función from().
// Luego se recorre la matriz de filas devueltas y se imprime el resultado

knex.from('cars').select('*')
    .then((rows) => {
        for (row of rows) {
            console.log(`${row['id']} ${row['name']} ${row['price']}`);
        }
    })
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    });