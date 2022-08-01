/* Lectura y escritura con Promises
 * 
 * Realizar un programa que ejecute las siguientes tareas:
 * 
 * A) Lea el archivo info.txt generado en el desafío anterior deserealizándolo
 * en un objeto llamado info.
 * B) Mostrar este objeto en la consola.
 * C) Modifique el author a "Coderhouse" y guarde el objeto serializado
 * en otro archivo llamado package.json.coder
 * D) Mostrar los errores por consola.
 * 
 * - Trabajar con fs.promises (then/catch)
 * - Para el punto 3 considerar usar JSON.stringify(info.contenidoObj, null, 2) para
 * preservar el formato de representación del objeto en el archivo.
 */
const fs = require('fs');

const readAndWriteInfo = () => {
    fs.promises.readFile('info.txt', 'utf-8')
        .then(contenido => {
            const info = JSON.parse(contenido);
            console.log(info);
            info.contenidoObj.author = 'Coderhouse';
            fs.promises.writeFile('package.json.coder', JSON.stringify(info.contenidoObj, null, 2))
                .then(() => console.log('Se guardó el archivo package.json.coder'))
                .catch(err => console.log('Error: ', err));
        })
        .catch(err => {
            console.log('Error: ', err);
        });
}

readAndWriteInfo();