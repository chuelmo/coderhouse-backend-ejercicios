/*
Crear un servidor que permita elegir y subir un archivo utilizando un formulario servido desde su espacio público.
Dicho archivo se almacenará en una carpeta propia del servidor llamada 'uploads'.
El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip
Utilizar express y multer en un proyecto de servidor que escuche en el puerto 8080.

*/
const express = require('express');
const multer = require('multer');

const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/08_problem_03.html');
});

app.listen(8080, () => console.log('Server started on port 8080'));

//SET Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});