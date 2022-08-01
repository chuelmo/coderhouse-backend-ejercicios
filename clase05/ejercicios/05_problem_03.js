/*
Realizar un proyecto en node.js que permita calcular cuántos años y días totales transcurrieron desde la fecha de tu nacimiento. Para ello utilizar la dependencia moment instalándola en forma local desde npm. Imprimir los resultados por consola. Hacer las modificaciones necesarias para que sólo se actualicen los patches para la librería recién instalada.

Un ejemplo de salida:
Hoy es 11/01/2021
Nací el 29/11/1968
Desde mi nacimiento han pasado 52 años.
Desde mi nacimiento han pasado 19036 días.

Ayuda:
Utilizar los métodos diff y format de la librería moment.
*/
const moment = require('moment');

const today = moment();
const birthday = moment("1972-03-01");

let days = today.diff(birthday, 'days');
let years = today.diff(birthday, 'years');

console.log(`Hoy es ${today.format('DD/MM/YYYY')}`);
console.log(`Nací el ${birthday.format('DD/MM/YYYY')}`);
console.log(`Desde mi nacimiento han pasado: ${years} años`);
console.log(`Desde mi nacimiento han pasado: ${days} días`);