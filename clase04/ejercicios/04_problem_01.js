/*
 * Realizar un programa que:
 * A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
 * B) Lea nuestro propio archivo de programa y lo muestre por consola.
 * C) Incluya el manejo de errores con try catch (progresando las excepciones
 * con throw new Error)
 * 
 * Aclaración:
 * utilizar las funciones sincrónicas de lectura y escritura de archivos del módulo fs de node.js
 */
const fs = require('fs');

//Punto A
const d = new Date();
try {
    fs.writeFileSync('./fyh.txt', d.toString());
} catch(e) {
    console.log(e);
}

//Punto B
try {
    const data = fs.readFileSync(process.argv[1], 'utf-8');
    console.log(data);
} catch(e) {
    console.log(e);
}

