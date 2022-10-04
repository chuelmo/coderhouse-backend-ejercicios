import { faker } from '@faker-js/faker';
import * as fs from 'fs';

let str = 'NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n';

for (let i = 0; i < 100; i++) {
    str += faker.name.firstName() +
        ';' + faker.name.lastName() +
        ';' + faker.internet.email() +
        ';' + faker.name.jobTitle() +
        ';' + faker.random.locale() + '\n';
}

fs.writeFile('./test.csv', str, err => {
    if (err) console.log(err);
    console.log('Archivo guardado con éxito');
});