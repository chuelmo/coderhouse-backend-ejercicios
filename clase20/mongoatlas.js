/*
1) Conectarse a la base MongoDB Atlas con los clientes CLI, Compass y Node.js
2) Insertar estos documentos en una base llamada ‘ecommerce’, colección ‘usuarios’:
[
    { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
    { nombre: 'María', apellido: 'García', dni: '29575148' },
    { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
    { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
]
3) Listar todos los documentos.
4) Incorporar un usuario más: 
 nombre: 'Federico', apellido: 'Perez', dni: '320118321' }
5) Utilizar sintaxis de Promesas con async await e import para la importación de módulos.
6) Borrar al usuario llamado Tomas.
7) Actualizar el usuario llamado 'Carlos' al nombre 'Juan Carlos' y luego listar los documentos finales.
*/
import mongoose from 'mongoose';
import * as model from './models/usuario.js';

const misUsuarios = [
    { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874' },
    { nombre: 'María', apellido: 'García', dni: '29575148' },
    { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790' },
    { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670' }
];

await CrudUsuarios();
console.log('Programa finalizado');

async function CrudUsuarios() {
    try {
        const URL = 'mongodb+srv://chuelmo_admin:XLAHGMRKC9wgR4rI@cluster0.rmhpz.mongodb.net/ecommerce?retryWrites=true&w=majority';
        let conn = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos mongoAtlas conectada!');
        console.log('-----------------------------------\n');

        console.log('\nInsertar los siguientes usuarios:');
        console.log('------------------------------------------------------------\n');
        let response = await model.usuarios.insertMany(misUsuarios);
        console.log(response);

        console.log('\nTodos los usuarios ordenados alfabéticamente por apellido');
        console.log('------------------------------------------------------------\n');
        console.log(await model.usuarios.find({}, {nombre:1, apellido:1, dni:1, _id:0}).sort({apellido: 1}));

        console.log('\nInsertar un usuario más:');
        console.log('------------------------------------------------------------\n');
        const usuario = {nombre: 'Federico', apellido: 'Perez', dni: '320118321'};
        const usuarioSaveModel = new model.usuarios(usuario);
        let usuarioSave = await usuarioSaveModel.save();
        console.log(usuarioSave);

        mongoose.connection.close();

    } catch (err) {
        console.log('Hubo un problema: ', err);
    }
}