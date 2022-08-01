/*
Datos y variables
1) Definir variables variables que almacenen los siguiente datos:
    * Un nombre: “pepe”
    * Una edad: 25
    * Un precio: $99.90
    *Los nombres de mis series favoritas: “Dark”, “Mr Robot”, “Castlevania”
    * Mis películas favoritas, en donde cada película detalla su nombre, el año de estreno, y una lista con los nombres de sus protagonistas.
2) Mostrar todos esos valores por consola
3) Incrementar la edad en 1 y volver a mostrarla
4) Agregar una serie a la lista y volver a mostrarla
*/
const nombre = 'Pepe';
let edad = 25;
let precio = 99.90;
const series = ['Dark', 'Mr Robot', 'Castlevania'];
const movies = [
    {
        nombre: 'El señor de los anillos',
        estreno: 2010,
        protagonistas: ['Paco', 'Juan', 'Marta']
    },
    {
        nombre: 'Click',
        estreno: 2011,
        protagonistas: ['Sergio', 'Brad', 'Angie']
    },
    {
        nombre: 'Run away',
        estreno: 2002,
        protagonistas: ['Renata', 'Winny', 'Wilbur']
    }
];
console.log(nombre);
console.log(edad);
console.log(precio);
console.log(series);
console.log(movies);
edad++;
console.log(edad);
series.push('Lucifer');
console.log(series);