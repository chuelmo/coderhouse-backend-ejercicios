//npm install express y multer

// call all the required packages

const express = require('express');
const multer = require('multer');

const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => console.log('Server started on port 8080'));

//SET Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;
    console.log('file:', file);
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(files);
});