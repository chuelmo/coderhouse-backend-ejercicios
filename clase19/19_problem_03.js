/*
Realizar un proyecto en Node.js que sobre la base colegio realice las siguientes acciones:
    Actualizar el dni del estudiante Lucas Blanco a 20355875
    Agregar un campo 'ingreso' a todos los documentos con el valor false
    Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A
    Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v
    Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v
    Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
    Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS. 
        Por ejemplo: 
            {"_id":"604df61b5e39a84ba41313e4","nombre":"Fabio","apellido":"Pieres","edad":39,"dni":"4315388","curso":"1B","nota":9,"ingreso":false} -> Fecha creación:  14/3/2021 08:40:11
    Implementar estas funciones utilizando Promises en Mongoose con sintaxis async/await, utilizando la importación en formato ES Modules (import)
    Verificar la información de la base 'colegio' a través de algún cliente (compass, etc).
*/
import mongoose from 'mongoose';
import * as model from './models/estudiante.js';

await CrudEstudiantes();
console.log('Programa finalizado');

async function CrudEstudiantes() {
    try {
        const URL = 'mongodb://root:example@localhost:27017/colegio';
        let conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        });
        console.log('Base de datos conectada');
        console.log('-----------------------\n');

        console.log('\nActualizar el dni del estudiante Lucas Blanco a 20355875');
        console.log('------------------------------------------------------------\n');
        await model.estudiantes.updateOne({$and: [{apellido: 'Blanco'}, {nombre: 'Lucas'}]}, {$set: {dni: 20355875}},  {"upsert": false});
        console.log(await model.estudiantes.find({$and: [{apellido: 'Blanco'}, {nombre: 'Lucas'}]}, {nombre:1, apellido:1, edad:1, dni:1, _id:0}));
        
        console.log(`\nAgregar un campo 'ingreso' a todos los documentos con el valor false`);
        // Con mongoose esto solo es posible si antes se le agrega el campo al Schema!!!!!!
        console.log('------------------------------------------------------------\n');
        console.log(await model.estudiantes.updateMany({}, {$set: {"ingreso": false}}, {"upsert": false, "multi": true}));
        console.log(await model.estudiantes.find({}, {nombre:1, apellido:1, ingreso:1, _id:0}));

        console.log(`\nModificar 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A`);
        console.log('------------------------------------------------------------\n');
        console.log(await model.estudiantes.updateMany({curso: '1A'}, {$set: {"ingreso": true}}, {"upsert": false, "multi": true}));
        console.log(await model.estudiantes.find({curso: '1A'}, {nombre:1, apellido:1, ingreso:1, _id:0}));

        console.log('\nListar los estudiantes que aprobaron sin los campos de _id y __v');
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({nota: {$gte: 4}}, {nombre:1, apellido:1, curso:1, nota:1, _id:0}).sort({apellido: 1}));

        console.log(`\nListar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v`);
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({ingreso: true}, {nombre:1, apellido:1, curso:1, nota:1, _id:0}).sort({apellido: 1}));

        console.log(`\nBorrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
        `);
        // Para poder hacer esto es imprescindible definir el índice como sparse además de unique.
        // No habría problemas si en vez de borrar el campo como lo estoy haciendo yo borro todo el documento con deleteMany
        // Tuve que darle estos permisos al usuario root db.grantRolesToUser("root", ["root"]) para borrar la db y empezar de nuevo
        // con el nuevo esquema.
        console.log('-------------------------\n');
        console.log(await model.estudiantes.updateMany({ingreso: true}, {$unset: {dni: 1}}, {"upsert": false, "multi": true}));

        console.log(`\nListar todos los estudiantes sin el campo __v`);
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({}, {__v:0}).sort({apellido: 1}));

       
        mongoose.connection.close();

    } catch (err) {
        console.log('Hubo un problema: ', err);
    }
}