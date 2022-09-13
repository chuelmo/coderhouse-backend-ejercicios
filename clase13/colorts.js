"use strict";
/*
Realizar un proyecto TypeScript node.js que genere un color aleatorio en formato RGB (canal rojo, verde y azul entre 0 y 255) y lo muestre por consola.
La funcionalidad debe estar implementada dentro de una clase en un archivo color.ts y deberá utilizar sintaxis Typescript tipada.
El proyecto deberá convertir este código TS a JS5 en forma automática con TSC CLI

*/
class ColorTs {
    constructor() {
        this.red = Math.floor(Math.random() * 255);
        this.green = Math.floor(Math.random() * 255);
        this.blue = Math.floor(Math.random() * 255);
    }
}
const miColor = new ColorTs();
console.log(`red: ${miColor.red}, green: ${miColor.green}, blue: ${miColor.blue}`);
