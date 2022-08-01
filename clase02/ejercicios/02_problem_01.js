/*
1) Definir la función mostrarLista que reciba una lista de datos y muestre su contenido, si no está vacía, o de lo contrario muestre el mensaje: 'lista vacía'. Luego, invocarla con datos de prueba para verificar que funciona bien en ambos casos.
2) Definir una función anónima que haga lo mismo que la del punto 1, e invocarla inmediatamente, pasando una lista con 3 números como argumento.
*/

function mostrarLista(datos) {
    if (datos.length > 0) {
        console.log(datos);
    } else {
        console.log('Lista vacía');
    }
}

const lista = ['pan', 'agua', 'tomate'];
const lista2 = [];

mostrarLista(lista);
mostrarLista(lista2);

//IIFE
(datos => {
    if (datos.length > 0) {
        console.log(datos);
    } else {
        console.log('Lista vacía');
    }
})(lista);