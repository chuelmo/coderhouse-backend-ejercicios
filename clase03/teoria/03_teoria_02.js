/*
En este ejemplo, “callbackParaLoguear” es una función anónima enviada como argumento a la función “escribirYLoguear” que obtiene la fecha de grabación y muestra un mensaje por pantalla

*/

function escribirYLoguear(texto, cb) {
    //simulamos que escribimos en un archivo
    console.log(texto);
    // al finalizar ejecutamos el callback
    cb('archivo escrito con éxito');
}

escribirYLoguear('Hola mundo de los callbacks', (mensajeParaLoguear) => {
    const fecha = new Date().toLocaleDateString();
    console.log(`${fecha}: ${mensajeParaLoguear}`);
})