/* Ejemplo Ejecución Asincrónica
En el ejemplo no se bloquea la ejecución normal del programa y se permite que este se siga ejecutando.
La ejecución de la operación de escritura “comienza” e inmediatamente cede el control a la siguiente instrucción, que escribe por pantalla el mensaje de finalización. 
Cuando la operación de escritura termina, ejecuta el callback que informará por pantalla que la escritura se realizó con éxito.
*/

function escribirArchivo(msg, cb) {
    setTimeout(() => {
        console.log(`Mensaje de la función escribirArchivo: ${msg}`);
        cb();
    }, 1000);
}

console.log('Inicio del programa');

// el creador de esta función la definió como no bloqueante
// recibe un callback que se ejecutará al
// finalizar la escritura.

escribirArchivo('Hola mundo!', () => {
    console.log('Terminé de escribir el archivo');
});

console.log('Fin del programa');

// Se mostrará por pantalla:
// > Inicio del programa
// > Fin del programa
// > Mensaje de la función escribirArchivo: Hola mundo!
// > Terminé de escribir el archivo