/*
2- ARRAY DE OBJETOS
Desarrollar un proyecto en node.js que declare un array de objetos de este tipo:

const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

Y obtenga la siguiente información de dicho array
A) Los nombres de los productos en un string separados por comas.
B) El precio total
C) El precio promedio
D) El producto con menor precio
E) El producto con mayor precio
F) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola

Aclaración: todos los valores monetarios serán expresados con 2 decimales
*/
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

let nombres = productos.map(x => x.nombre).join();

let totalPrice = productos.reduce((total, currentValue) => {
    return total + currentValue.precio;
}, 0);

let averagePrice = totalPrice / productos.length;

let precios = productos.map(x => x.precio);

let minPrice = Math.min(...precios);

let productWithMinPrice = productos.filter(x => x.precio === minPrice)[0];

let maxPrice = Math.max(...precios);

let productWithMaxPrice = productos.filter(x => x.precio === maxPrice)[0];

let resultado = {
    'nombres': nombres,
    'totalPrice': totalPrice.toFixed(2),
    'averagePrice': averagePrice.toFixed(2),
    'chepearProduct': productWithMinPrice,
    'expensiveProduct': productWithMaxPrice
};

console.log('Nombres de los productos: ', nombres);
console.log('Total: ', totalPrice.toFixed(2));
console.log('Precio promedio: ', averagePrice.toFixed(2));
console.log('Menor precio: ', minPrice);
console.log('y el producto con el menor precio es: ', productWithMinPrice);
console.log('Máximo precio: ', maxPrice);
console.log('y el producto con el precio mayor es: ', productWithMaxPrice);
console.log('Resultado: ', resultado);


