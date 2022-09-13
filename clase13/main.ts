import * as operaciones from './lib/operaciones';

const mensaje:string = 'Hola Typescript!';
console.log(mensaje);

let num1:number = 10;
let num2:number = 4;
console.log(`La suma de ${num1} más ${num2} es ${operaciones.sumar(num1, num2)}`);