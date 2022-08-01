/*
>> Consigna: 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:
getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.

4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
*/

// definición e implementación de la clase
// Usuario
class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros.map(libro => libro);
        this.mascotas = mascotas.map(pet => pet);
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombre) {
        this.mascotas.push(nombre);
    }

    getMascotas() {
        return this.mascotas.map(pet => pet);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({ nombre, autor });
    }

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }
}

// Programa principal
const libros = [
    {
        nombre: 'El señor de las moscas',
        autor: 'William Golding'
    },
    {
        nombre: 'Fundación',
        autor: 'Isaac Asimov'
    }
];
const mascotas = ['perro', 'gato'];
const chuelmo = new Usuario('Christian', 'Huelmo', libros, mascotas);

console.log(`Nombre completo: ${chuelmo.getFullName()}`);
console.log(`Estas son las mascotas: ${chuelmo.getMascotas()}`);
chuelmo.addMascota('vaca');
console.log(`Agregamos como mascota una vaca y el resultado es: ${chuelmo.getMascotas()}`);
console.log(`En total son ${chuelmo.countMascotas()} mascotas`);
console.log(`Estos son los libros que tiene ${chuelmo.getFullName()}: ${chuelmo.getBookNames()}`)
console.log(`Agregamos el libro 'La catedral del mar'`);
chuelmo.addBook('La catedral del mar', 'Ildefonso Falcones');
console.log(`Ahora los libros son: ${chuelmo.getBookNames()}`);