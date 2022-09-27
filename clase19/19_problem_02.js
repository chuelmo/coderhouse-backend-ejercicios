/*
Desarrollar un proyecto en Node.js que realice la lectura de los estudiantes de la base colegio (creada anteriormente) mostrándolos en consola, cumpliendo con los siguientes puntos:
Los estudiantes ordenados por orden alfabético según sus nombres.
El estudiante más joven.
Los estudiantes que pertenezcan al curso '2A'.
El segundo estudiante más joven.
Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a).
Los estudiantes que sacaron 10.
El promedio de notas del total de alumnos.
El promedio de notas del curso '1A'.
Utilizar la interfaz basada en Promises de Mongoose, sintaxis then/catch con importación de módulos en formato CommonJS.
Los resultados se deben imprimir en orden según los puntos citados (Promesas anidadas con .then)
*/
import mongoose from 'mongoose';
import * as model from './models/estudiante.js';

await Consultas();
console.log('Programa finalizado');

async function Consultas() {
    try {
        const URL = 'mongodb://root:example@localhost:27017/colegio';
        let conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        });
        console.log('Base de datos conectada');
        console.log('-----------------------\n');

        console.log('\nTodos los estudiantes ordenados alfabéticamente por apellido');
        console.log('------------------------------------------------------------\n');
        console.log(await model.estudiantes.find({}, {nombre:1, apellido:1, edad:1, dni:1, _id:0}).sort({apellido: 1}));

        console.log('\nEl estudiante más joven');
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({}, {nombre:1, apellido:1, edad:1, dni:1, _id:0}).sort({edad: 1}).limit(1));

        console.log('\nEstudiantes del curso 2A');
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({curso: '2A'}, {nombre:1, apellido:1, curso:1, _id:0}).sort({apellido: 1}));

        console.log('\nEl segundo estudiante más joven');
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({}, {nombre:1, apellido:1, edad:1, dni:1, _id:0}).sort({edad: 1}).skip(1).limit(1));

        console.log('\nEstudiantes con nota 10');
        console.log('-------------------------\n');
        console.log(await model.estudiantes.find({nota: 10}, {nombre:1, apellido:1, curso:1, _id:0}).sort({apellido: 1}));

        console.log('\nPromedio de notas');
        console.log('------------------------------------------------------------\n');
        let resultado = await model.estudiantes.find({});
        let total = 0;
        let cantAlumnos = 0;
        for (let alumno of resultado) {
            total += alumno.nota;
            cantAlumnos++;
        }
        console.log(`El promedio de notas entre ${cantAlumnos} alumnos es de: ${total / cantAlumnos}`);

        console.log('\nPromedio de notas del curos 1A');
        console.log('------------------------------------------------------------\n');
        resultado = await model.estudiantes.find({curso: '1A'});
        total = 0;
        cantAlumnos = 0;
        for (let alumno of resultado) {
            total += alumno.nota;
            cantAlumnos++;
        }
        console.log(`El promedio de notas entre ${cantAlumnos} alumnos del curso 1A es de: ${total / cantAlumnos}`);


        mongoose.connection.close();

    } catch (err) {
        console.log('Hubo un problema: ', err);
    }
}