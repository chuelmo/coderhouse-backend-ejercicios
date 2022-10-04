/*
Desarrollar un servidor basado en Node.js y express que para la ruta '/test' responda con un array de 10 objetos, con el siguiente formato:
{
    nombre: '',
    apellido: '',
    color: ''
}

Los objetos generados tendrán un valor aleatorio para cada uno de sus campos. El valor será obtenido de los siguientes arrays:
const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

Con cada request se obtendrán valores diferentes.
*/

import express from 'express';
const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];

const app = express();

const generateMockData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
        const firstname = nombres[Math.floor(Math.random() * 5)];
        const lastname = apellidos[Math.floor(Math.random() * 5)];
        const color = colores[Math.floor(Math.random() * 5)];
        const item = {
            nombre: firstname,
            apellido: lastname,
            color: color
        };
        data.push(item);
    }
    return data;
}

const mockData = (req, res) => {
    const data = generateMockData();
    res.status(200).send(data);
}

app.get('/test', mockData);

app.listen(3100, () => {
    console.log('Servidor express corriendo en el puerto 3100');
});