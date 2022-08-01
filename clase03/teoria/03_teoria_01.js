/*
Un callback es una función que se envía como argumento a otra función.

La intención es que la función que hace de receptora ejecute la función que se le está pasando por parámetro.

Podemos decir que la función “ejecutar” que usamos en el punto anterior “recibe un callback”.

Como ya sabemos, donde puedo usar una variable puedo también usar directamente el contenido de esa variable. En el ejemplo, la función ‘ejecutar’ recibe una función anónima, y la ejecuta.
*/

const ejecutar = (unaFuncion, params) => unaFuncion(params);

const saludar = nombre => console.log(`Saludos ${nombre}`);

ejecutar(saludar, 'terrícola');