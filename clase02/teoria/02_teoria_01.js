// Clases
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    static saludoCorto = 'Hola, soy un saludo corto';

    saludoCompleto() {
        console.log(`Buenas soy ${this.nombre}`);
    }

    saludoEstatico() {
        console.log(Persona.saludoCorto);
    }
}

const p = new Persona('Pepe', 12);
p.saludoCompleto();
p.saludoEstatico();