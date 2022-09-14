const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

const cars = [
    {name: 'Audi', price: 52642},
    {name: 'Mercedes', price: 57127},
    {name: 'Skoda', price: 9000},
    {name: 'Volvo', price: 29000},
    {name: 'Bentley', price: 350000},
    {name: 'Citroen', price: 41400},
    {name: 'Hummer', price: 41400},
    {name: 'Vokswagen', price: 21600}
];

//Seleccionamos la tabla de autos con knex e insertamos una fila por cada auto.
knex('cars').insert(cars)
    .then(() => console.log('Data inserted!'))
    .catch((err) => {
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    });