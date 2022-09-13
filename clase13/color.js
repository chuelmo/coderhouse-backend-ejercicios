/*
Realizar un programa que genere un color aleatorio en formato RGB (canal rojo, verde y azul entre 0 y 255) y lo muestre por consola. Este estará implementado en un archivo llamado color.js 
La funcionalidad debe estar implementada dentro de una clase y deberá utilizar sintaxis ES6 (const, let, arrow function y template string).
Convertir este código ES6 a JS5 con Babel online. Realizar esta conversión en forma automática dentro de un proyecto node.js que utilice Babel CLI

*/

class Color {
    constructor() {
        this.red = Math.floor(Math.random() * 255);
        this.green = Math.floor(Math.random() * 255);
        this.blue = Math.floor(Math.random() * 255);
    }
}

const color = new Color();
console.log(`red: ${color.red}, green: ${color.green}, blue: ${color.blue}`)