/*
Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y responda un mensaje de acuerdo a la hora actual: 

Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
Entre las 13 y las 19 hs será 'Buenas tardes!'. 
De 20 a 5 hs será 'Buenas noches!'.

Se mostrará por consola cuando el servidor esté listo para operar y en qué puerto lo está haciendo.

*/
const http = require('http')

const server = http.createServer((peticion, respuesta) => {
    const hora = new Date().getHours();
    let msg;
    if (hora >= 6 && hora < 13) {
        msg = "Buenos días!";
    } else if (hora >= 13 && hora < 20) {
        msg = "Buenas tardes!";
    } else {
        msg = "Buenas noches!";
    }
    respuesta.end(msg);
})

const connectedServer = server.listen(8080, () => {
   console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})
