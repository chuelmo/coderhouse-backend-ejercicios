/*
Definiremos una función llamada operación que reciba como parámetro dos valores y una función con la operación que va a realizar. Deberá retornar el resultado.

Definiremos las siguientes funciones: suma, resta, multiplicación, división y módulo. Estas recibirán dos valores y devolverán el resultado. Serán pasadas como parámetro en la llamada a la función operación

Todas las funciones tendrán que ser realizadas con sintaxis flecha.

*/

const operacion = (nro1, nro2, operation) => {
    const resultado = operation(nro1, nro2);
    return resultado;
}

const suma = (nro1, nro2) => nro1 + nro2;
const resta = (nro1, nro2) => nro1 - nro2;
const multiplicacion = (nro1, nro2) => nro1 * nro2;
const division = (nro1, nro2) => nro1 / nro2;
const modulo = (nro1, nro2) => nro1 % nro2;

console.log(operacion(10, 4, suma));
console.log(operacion(10, 4, resta));
console.log(operacion(10, 4, multiplicacion));
console.log(operacion(10, 4, division));
console.log(operacion(10, 4, modulo));