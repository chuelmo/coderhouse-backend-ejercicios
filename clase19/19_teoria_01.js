import mongoose from 'mongoose';
import * as model from './models/usuario.js';

await CRUD();
console.log('Programa finalizado');

async function CRUD() {
    try {
        const URL = 'mongodb://root:example@localhost:27017/ecommerce';
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        });
        console.log('Base de datos conectada');

        /* ------------------------------------ |
                      CREATE                    |
        ----------------------------------------| */
        console.log('CREATE');
        const usuario = {nombre: 'Juan', apellido: 'Perez', email: 'jp@g.com', password: 123456};
        const usuarioSaveModel = new model.usuarios(usuario);
        let usuarioSave = await usuarioSaveModel.save();
        console.log(usuarioSave);

        /* ------------------------------------ |
                      READ ALL                  |
        ----------------------------------------| */
        console.log('READ ALL');
        let usuarios = await model.usuarios.find({});
        console.log(usuarios);

        /* ------------------------------------ |
                      UPDATE                    |
        ----------------------------------------| */
        console.log('UPDATE');
        let usuarioUpdate = await model.usuarios.updateOne({nombre: 'Juan'}, {$set: {password: 654321}});
        console.log('Usuario actualizado: ', usuarioUpdate);

        /* ------------------------------------ |
                CREATE MORE                     |
        ----------------------------------------| */
        console.log('CREATE 4 users more');
        await new model.usuarios({nombre: 'Jorge', apellido: 'Pastrana', email: 'fpr@g.com', password: 123456}).save();
        await new model.usuarios({nombre: 'Pedro', apellido: 'Suarez', email: 'ps@g.com', password: 123456}).save();
        await new model.usuarios({nombre: 'Ana', apellido: 'Mei', email: 'am@g.com', password: 123456}).save();
        await new model.usuarios({nombre: 'Mirta', apellido: 'Blanco', email: 'mb@g.com', password: 123456}).save();

        /* ------------------------------------ |
                      READ ONE                  |
        ----------------------------------------| */
        console.log('READ SOMEONE');
        usuarios = await model.usuarios.find({nombre: 'Juan'});
        console.log('Juan es: ', usuarios);

        /* ------------------------------------ |
             READ - SORT - SKIP - PROJECTION    |
        ----------------------------------------| */
        console.log('READ PROJECTION + FILTER');
        console.log(await model.usuarios.find({apellido: 'Suarez'}, {nombre:1, apellido:1, email:1, _id:0}));

        console.log('READ PROJECTION + SORT');
        console.log(await model.usuarios.find({}, {nombre:1, apellido:1, email:1, _id:0}).sort({nombre: -1}));

        console.log('READ PROJECTION + SORT + SKIP');
        console.log(await model.usuarios.find({}, {nombre:1, apellido:1, email:1, _id:0}).sort({nombre: -1}).skip(2));

        console.log('READ PROJECTION + SORT + SKIP + LIMIT');
        console.log(await model.usuarios.find({}, {nombre:1, apellido:1, email:1, _id:0}).sort({nombre: -1}).skip(1).limit(2));

        mongoose.connection.close();
    } catch (err) {
        console.log('Hubo un problema: ', err);
    }
}