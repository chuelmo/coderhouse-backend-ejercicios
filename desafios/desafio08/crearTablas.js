const { options: optionsMaria } = require('./config/mariaDB');
const { options: optionsSqlite } = require('./config/sqliteDB');
const knexMaria = require('knex')(optionsMaria);
const knexSqlite = require('knex')(optionsSqlite);

knexMaria.schema.hasTable('productos').then((exists) => {
    if (!exists) {
        knexMaria.schema.createTable('productos', table => {
            table.increments('id');
            table.string('title');
            table.float('price');
            table.string('thumbnail');
        })
            .then(() => console.log('Table productos created!'))
            .catch((err) => {
                console.log(err);
                throw err;
            });
    } else {
        console.log('No se creó la tabla productos porque ya existe!');
    }
})
.finally(() => {
    knexMaria.destroy();
});

knexSqlite.schema.hasTable('mensajes').then((exists) => {
    if (!exists) {
        knexSqlite.schema.createTable('mensajes', table => {
            table.increments('id');
            table.string('email');
            table.string('fecha');
            table.string('mensaje');
        })
            .then(() => console.log('Table mensajes created!'))
            .catch((err) => {
                console.log(err);
                throw err;
            });
    } else {
        console.log('No se creó la tabla mensajes porque ya existe!');
    }
})
.finally(() => {
    knexSqlite.destroy();
});

console.log('Para que este script corra sin errores es necesario que exista la db ecommerce en MariaDB');
console.log('También es necesario que exista la carpeta DB en el mismo lugar donde se corre este script para crear la db de sqlite3');


