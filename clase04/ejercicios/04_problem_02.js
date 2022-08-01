/*
 * Escribir un programa ejecutable que realice las siguientes acciones:
 * A) Ejecutar la instrucción npm init -y
 * B) Lea el archivo package.json y declare un objeto
 * con el siguiente formato y datos:
 * const info = {
 *  contenidoStr: (contenido del archivo leído en formato string),
 *  contenidoObj: (contenido del archivo leído en formato objeto),
 *  size: (tamaño en bytes del archivo)
 * }
 * C) Muestre por consola el objeto info luego de leer el archivo.
 * D) Guardar el objeto info en un archivo llamado info.txt dentro
 * de la misma carpeta de package.json.
 * E) Incluir manejo de errores (con throw new Error)
 * 
 * - Utilizar la lectura y escritura de archivos en modo asincrónico con callbacks.
 * - Para deserializar un string con contenido JSON utilizar JSON.parse
 * - Para serializar un objeto (convertirlo a string) y guardarlo
 * en un archivo utilizar JSON.stringify
 * - Considerar usar JSON.stringify(info, null, 2) para preservar el formato de 
 * representación del objeto en el archivo (2 representa
 * en este caso la cantidad de
 * espacios de indentación usadas al representar el objeto como string.
 */

const fs = require('fs');

const info = {
    contenidoStr: '',
    contenidoObj: '',
    size: 0
};

fs.readFile('./package.json', 'utf-8', (error, contenido) => {
    if (error) {
        throw new Error(error);
    } else {
        info.contenidoStr = contenido;
        info.contenidoObj = JSON.parse(contenido);
        info.size = contenido.length;
        console.log(info);
        fs.writeFile('./info.txt', JSON.stringify(info, null, 2), err => {
            if (err) {
                throw new Error(err); 
            } else {
                console.log("Se guardó el archivo info.txt");
            }
        });
    }
});