import mongoose from 'mongoose';
const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    apellido: {type: String, require: true, max: 100},
    dni: {type: String, require: true, max: 20}
});

export const usuarios = mongoose.model(usuariosCollection, UsuarioSchema);