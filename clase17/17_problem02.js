/*
A continuación se muestra un enunciado para trabajar con bases de datos SQL:
1) Crear una base de datos llamada 'mibase'
2) Crear una tabla dentro de esa base con el nombre 'usuarios' que contenga los siguientes campos:
    - 'nombre' del tipo varchar no nulo
    - 'apellido' del tipo varchar no nulo
    - 'edad' del tipo entero sin signo
    - 'email' del tipo varchar no nulo
    - 'id' clave primaria autoincremental no nula
3) Insertar estos 3 usuarios en esa tabla
    - Juan Perez edad 23 jp@gmail.com
    - Pedro Mei edad 21 pm@gmail.com
    - Juana Suarez edad 25 js@gmail.com
4) Listar las tablas existentes
5) Listar los usuarios agregados

*/

// 1) con knex
const options = {
    client: 'sqlite3',
    connection: {
        filename: './mibase.sqlite3'
    },
    useNullAsDefault: true
};

const knex = require('knex')(options);

const users = [
    { nombre: 'Juan', apellido: 'Perez', edad: 23, email: 'jp@gmail.com' },
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, email: 'pm@gmail.com' },
    { nombre: 'Juana', apellido: 'Suarez', edad: 25, email: 'js@gmail.com'}
];

// 2)
// knex.schema.createTable('usuarios', table => {
//     table.increments('id');
//     table.string('nombre').notNullable();
//     table.string('apellido').notNullable();
//     table.integer('edad');
//     table.string('email').notNullable();
// })
//     .then(() => console.log('Table usuarios created!'))
//     .catch((err) => {
//         console.log(err);
//         throw err;
//     })
//     .finally(() => {
//         knex.destroy();
//     });

// 3)
// knex('usuarios').insert(users)
//     .then(() => console.log('Data inserted!'))
//     .catch((err) => {
//         console.log(err);
//         throw err;
//     })
//     .finally(() => {
//         knex.destroy();
//     });

// 5)
knex.from('usuarios').select('*')
    .then((rows) => {
        for (row of rows) {
            console.log(`${row['id']} ${row['nombre']} ${row['apellido']} ${row['edad']} ${row['email']}`);
        }
    })
    .catch((err) => {
        console.log('error al hacer el select');
        console.log(err);
        throw err;
    })
    .finally(() => {
        knex.destroy();
    });

// 4)
const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./mibase.sqlite3');

let sql = `SELECT name FROM sqlite_master WHERE type='table';`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(`Tabla: ${row.name}`);
  });
});

// close the database connection
db.close();