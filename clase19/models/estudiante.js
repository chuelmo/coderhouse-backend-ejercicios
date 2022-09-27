import mongoose from 'mongoose';
const estudiantesCollection = 'Estudiante';

const EstudianteSchema = new mongoose.Schema({
    nombre: {type: String, require: true, max: 100},
    apellido: {type: String, require: true, max: 100},
    edad: {type: Number, require: true},
    dni: {type: String, require: true, max: 20, unique : true, sparse: true, dropDups: true},
    curso: {type: String, require: true, max: 100},
    nota: {type: Number, require: true},
    ingreso: {type: Boolean}
});

export const estudiantes = mongoose.model(estudiantesCollection, EstudianteSchema);