/*
Realizar un proyecto en Node.js que se conecte a la base de datos llamada ecommerce implementada en MariaDB y ejecute las siguientes procesos:
1) Debe crear una tabla llamada articulos con la siguiente estructura:
 Campos: 
    - nombre tipo varchar 15 caracteres no nulo
    - codigo tipo varchar 10 caracteres no nulo
    - precio tipo float
    - stock tipo entero
    - id clave primaria autoincremental no nula
2) Insertar 5 articulos en esa tabla, con datos de prueba con stocks positivos 
3) Listar la tabla mostrando los resultados en la consola
4) Borrar el articulo con id = 3
5) Actualizar el stock a 0 del articulo con id = 2

Notas:
- Crear un único archivo ejecutable a través de node.js que realice lo pedido. Considerar que estos son procesos asincrónicos que devuelven promesas y deben ser anidados para mantener el orden de operación. Utilizar la sintaxis then/catch
- Agregar como primera acción que, en caso de existir la tabla, la borre (drop), así al ejecutar estas mismas tareas, empezamos desde cero sin errores y datos residuales.
*/
const { options } = require('./config/db_mariaDB');
const knex = require('knex')(options);

const articulos = [
    {nombre: 'Ventilador', codigo: 'xre1212', precio: 235, stock: 15},
    {nombre: 'Lavarropa', codigo: 'ez57865', precio: 744, stock: 6},
    {nombre: 'Exprimidora', codigo: 'zz11a12', precio: 80, stock: 9},
    {nombre: 'Calentador', codigo: 'rzuu12', precio: 40, stock: 27},
    {nombre: 'Monitor', codigo: 'abab1', precio: 420, stock: 11}
];

(async () => {
    try {
        console.log('---> Si la tabla articulos existe la borramos');
        await knex.schema.dropTableIfExists('articulos');

        console.log('---> Ahora creamos la tabla artículos');
        await knex.schema.createTable('articulos', table => {
            table.increments('id');
            table.string('nombre', 15).notNullable();
            table.string('codigo', 10).notNullable();
            table.float('precio');
            table.integer('stock');
        });

        console.log('---> Insertamos los artículos');
        await knex('articulos').insert(articulos);

        console.log('---> Leemos todos los artículos');
        let rows = await knex.from('articulos').select('*');
        for (row of rows) {
            console.log(`${row['id']} ${row['nombre']} ${row['codigo']} ${row['precio']} ${row['stock']}`);
        }

        console.log('---> Borramos el artículo con id = 3');
        await knex.from('articulos').where('id','3').del();

        console.log('---> Actualiza el stock a 0 del artículo con id = 2');
        await knex.from('articulos').where('id', '2').update({stock: 0});

        console.log('---> Veamos ahora como quedaron nuestro artículos');
        rows = await knex.from('articulos').select('*');
        for (row of rows) {
            console.log(`${row['id']} ${row['nombre']} ${row['codigo']} ${row['precio']} ${row['stock']}`);
        }
    } catch (err) {
        console.log(err);
    } finally {
        knex.destroy();
    }
})();