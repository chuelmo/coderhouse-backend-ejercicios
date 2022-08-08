/*
Desarrollar un servidor que permita realizar la suma entre dos números utilizando tres rutas en estos formatos (Ejemplo con números 5 y 6)
a) Ruta get '/api/sumar/5/6
b) Ruta get '/api/sumar?num1=5&num2=62) 
c) Ruta get '/api/operacion/5+6
No hace falta validar los datos a sumar, asumimos que los ingresamos correctamente.
Implementar las rutas post, put y delete en la dirección '/api' respondiendo 'ok' + (post/put/delete) según corresponda. Probar estas rutas con Postman, verificando que el servidor responda con el mensaje correcto.
El servidor escuchará en el puerto 8080 y mostrará todos los mensajes de conexión/error que correspondan.
*/
const express = require('express');
const PORT = 8080;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.get('/api/sumar/:num1/:num2', (req, res) => {
    if (isNaN(parseInt(req.params.num1))) {
        res.status(400).json({"error": `El parámetro '${req.params.num1}' no es un número`});
    } else if (isNaN(parseInt(req.params.num2))) {
        res.status(400).json({"error": `El parámetro '${req.params.num2}' no es un número`});
    } else {
        const suma = parseInt(req.params.num1) + parseInt(req.params.num2);
        res.status(200).json({"suma": `${suma}`});
    }
});

app.get('/api/sumar', (req, res) => {
    if (Object.entries(req.query).length !== 2) {
        res.status(400).json({"error": "La consulta no es correcta se esperaban 2 parámetros"});
    } else {
        let isOk = true;
        let suma = 0;
        Object.values(req.query).forEach((value) => {
            if (isNaN(parseInt(value))) {
                isOk = false;
            } else {
                suma += parseInt(value);
            }
        });
        if (isOk) {
            res.status(200).json({"suma": suma});
        } else {
            res.status(400).json({"error": "Consulta incorrecta: se esperan 2 números"});
        }
    }
});

app.get('/api/operacion/:op', (req, res) => {
    let sumandos = req.params.op.split("+");
    if (sumandos.length !== 2) {
        res.status(400).json({"error": 'Se espera un parámetro con la operación, ej: num1+num2'});
    } else if (isNaN(parseInt(sumandos[0])) || isNaN(parseInt(sumandos[1]))) {
        res.status(400).json({"error": 'Se esperan 2 números separados por el signo de +'});
    } else {
        let num1 = parseInt(sumandos[0]);
        let num2 = parseInt(sumandos[1]);
        let suma = num1 + num2;
        res.status(200).json({"suma": suma});
    }
});

app.post('/api', (req, res) => {
    console.log('POST recibido');
    res.status(200).json({"response": "ok", "method": "POST"});
});

app.put('/api', (req, res) => {
    console.log('PUT recibido');
    res.status(200).json({"response": "ok", "method": "PUT"});
});

app.delete('/api', (req, res) => {
    console.log('DELETE recibido');
    res.status(200).json({"response": "ok", "method": "DELETE"});
});
