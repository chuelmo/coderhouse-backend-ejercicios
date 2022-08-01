/*
CLASES
En este ejercicio construiremos una herramienta que permita que diferentes personas puedan llevar cuentas individuales sobre algo que deseen contabilizar, al mismo tiempo que nos brinde una contabilidad general del total contado. Para ello:

1) Definir la clase Contador.
2) Cada instancia de contador debe ser identificada con el nombre de la persona responsable de ese conteo.
3) Cada instancia inicia su cuenta individual en cero.
4) La clase en sí misma posee un valor estático con el que lleva la cuenta de todo lo contado por sus instancias, el cual también inicia en cero.
5) Definir un método obtenerResponsable que devuelva el nombre del responsable de la instancia.
6) Definir un método obtenerCuentaIndividual que devuelva la cantidad contada por la instancia.
7) Definir un método obtenerCuentaGlobal que devuelva la cantidad contada por todos los contadores creados hasta el momento.
8) Definir el método contar que incremente en uno tanto la cuenta individual como la cuenta general
*/

//Clase Contador
class Contador {
    constructor(nombre) {
        this.nombre = nombre;
        this.cuenta = 0;
    }

    static cuentaGeneral = 0;

    obtenerResponsable() {
        return this.nombre;
    }

    obtenerCuentaIndividual() {
        return this.cuenta;
    }

    obtenerCuentaGlobal() {
        return Contador.cuentaGeneral;
    }

    contar() {
        this.cuenta += 1;
        Contador.cuentaGeneral += 1;
    }
}

// prueba de la clase Contador
contAlicia = new Contador('Alicia');
contPedro = new Contador('Pedro');
contPedro.contar();
contPedro.contar();
contAlicia.contar();
console.log('Datos del contador de Alicia:');
console.log('Nombre: ' + contAlicia.obtenerResponsable());
console.log('La cuenta de Alicia es: ' + contAlicia.obtenerCuentaIndividual());
console.log('--------------------------------------');
console.log('Datos del contador Pedro');
console.log('Nombre: ' + contPedro.obtenerResponsable());
console.log('La cuenta de Pedro es: ' + contPedro.obtenerCuentaIndividual());
console.log('--------------------------------------');
console.log('Alicia dice que la cuenta global es: ' + contAlicia.obtenerCuentaGlobal());
console.log('Pedro dice que la cuenta global es: ' + contPedro.obtenerCuentaGlobal());