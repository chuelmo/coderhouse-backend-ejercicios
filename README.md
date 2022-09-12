# Desafío 7 - Primer entrega del Proyecto Final

## Como correr este desafío

Como he venido explicando en entregas anteriores, este repo no es un solo proyecto sino que tiene todos y cada uno de los distintos ejercicios que hemos venido haciendo, tanto en clase como desafíos asignados. Por lo tanto para correr este desafío en su máquina personal debe tener los siguientes puntos en consideración.

- Clonar el repo
- Dentro de la carpeta del repo moverse a la carpeta /desafios/desafio07/
- En la carpeta /desafios/desafio07/ ejecutar:
  - npm install
  - npm run dev

## El desafío está deployado en heroku

- https://aqueous-reaches-33573.herokuapp.com/

## Video probando los endpoints y el front

- En Google Drive: [VideoBy_chuelmo](https://drive.google.com/file/d/1rNYoF_xUZME3xKCkD7EpmAaHlH60x6IQ/view?usp=sharing)
- En Mega: [VideoBy_chuelmo](https://mega.nz/file/AUYBXS5b#ESDreBpX38FxdixiqbedPscdzgQJGeScVmpeR7uJa4g)

## Auth y usuario ADMINISTRADOR

Como bien dice la letra hay determinados ENDPOINTS que no son accesibles si el usuario ADMINISTRADOR no es el que consulta, además en mi caso decidí que los ENDPOINTS no fueran públicos y que si el USUARIO no está "logueado" no puede acceder a ellos.
Para pobrar esta funcionalidad el proceso es manual (aún), se deben modificar los valores de las variables ADMINISTRADOR y USUARIO en el archivo /src/auth/index.js (que funciona como un middleware).

# Desafío 6 - Websockets

## Consigna 1:

Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real.

- Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
- Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.

## Consigna 2:

Añadiremos al proyecto un canal de chat entre los clientes y el servidor.

### Como correr el desafío

- Clonar el repo
- Moverse al directorio desafios/desafio06
- Ejecutar npm install
- Por último correr: npm run start-ZZZ donde ZZZ puede ser una de las siguientes 3 opciones: hbs, ejs, pug
  - Ej: npm run start-hbs

### El desafío está implementado con los 3 motores de templates que vimos.

# Desafío 5 - Templates (hbs ejs pug)

- Este repo es un "popurrí" de ejercicios hechos durante el curso de full-stack en Coderhouse, por lo tanto no es una única aplicación, sino por el contrario son montones de ejercicios y desafíos, agrupados por clases y desafíos.
- En el caso de este desafío, para correrlo, luego de clonar el repo se deben seguir los siguientes pasos:
  - Dentro de la carpeta del repo, moverse a la carpeta .\desafios\desafio05
  - Ejecutar: npm install
  - Por último correr: npm run start-ZZZ donde ZZZ puede ser una de las siguientes 3 opciones: hbs, ejs, pug
    - Ej: npm run start-hbs

# Desafío 4 - API RESTful

- Este desafío se encuentra en la carpeta "desafio04" de este repo.
- Si se clona el repo, para correr este desafío hay que cambiarse a la carpeta "desafio04" y escribir: node main.js

## ENDPOINTS

- / --> Ruta estática, página de inicio con formulario para agregar Productos.
- GET --> /api/productos --> Devuelve todos los productos
- GET --> /api/productos/:id --> Devuelve un producto según su ID
- POST --> /api/productos --> Recibe y agrega un producto, lo devuelve son su ID asignado
- PUT --> /api/productos/:id --> Recibe y actualiza un producto según su ID
- DELETE --> /api/productos/:id --> Elimina un producto según su ID

# coderhouse-backend-ejercicios

Muchos de los ejercicios planteados durante el curso de "Programación Backend" en Coderhouse.
Este README tendrá las entradas como un blog, la más nueva irá arriba.
A medida que amerite iré agregando entradas en este documento para explicar algún ejercicio o desafío.
