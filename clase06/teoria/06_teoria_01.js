/*Módulo HTTP

HTTP es un módulo nativo de Node.js
Trabaja con el protocolo HTTP, que es el que se utiliza en Internet para transferir datos en la Web.
Nos va a servir para crear un servidor HTTP que acepte solicitudes desde un cliente web.
Para poder utilizarlo en nuestro código, tenemos que requerirlo mediante la instrucción require('http') y guardarlo en una variable para su posterior uso.
*/

const http = require('http')

const server = http.createServer((peticion, respuesta) => {
   respuesta.end('Hola mundo de CoderHouse!')
})

const connectedServer = server.listen(8080, () => {
   console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
})
