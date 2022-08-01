/*
1- NÚMEROS ALEATORIOS

A- Crear un proyecto en node.js que genere 10000 números aleatorios en el rango  de 1 a 20.
B- Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.
*/
const generator = (repetition, minRange, maxRange) => {
    let numbers = {};
    for (let i = minRange; i <= maxRange; i++) {
        numbers[i] = 0;
    }
    for (let i = 0; i < repetition; i++) {
        let n = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange);
        numbers[n]++;
    }
    return numbers;
}

let numbers = generator(10000, 1, 20);
console.log(Object.keys(numbers).length);
for (let key in numbers) {
    console.log(`key: ${key} value: ${numbers[key]}`);
}