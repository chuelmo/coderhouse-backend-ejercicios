/*Ejemplo Ejecución Sincrónica
En todo momento, sólo se están ejecutando las instrucciones de una sola de las funciones a la vez. O sea, debe finalizar una función para poder continuar con la otra.

El fin de una función marca el inicio de la siguiente, y el fin de ésta, el inicio de la que le sigue, y así sucesivamente, describiendo una secuencia que ocurre en una única línea de tiempo
*/

function funA() {
    console.log(1);
    funB();
    console.log(2)
}

function funB() {
    console.log(3);
    funC();
    console.log(4);
}

function funC() {
    console.log(5);
}

funA();