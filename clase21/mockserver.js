import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();

const generateMockData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
        const item = {
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName()
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