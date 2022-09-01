/*Motor de plantillas custom
Desarrollar un motor de plantillas custom para un servidor basado en express, que permita representar en la ruta '/cte1' el siguiente archivo de plantilla 'plantilla1.cte':

<h1>^^titulo$$</h1>
<p>^^mensaje$$</p>
<b>^^autor$$</b>
<hr>
<i><b>Versión: ^^version$$</b></i>

Con los datos que provienen desde un objeto:

{ 
    titulo: (algún título en string),
    mensaje:(algún mensaje en string),
    autor: (algun autor en string),
    version: (numerica)
}

Este motor personalizado debe permitir parsear objetos de datos con claves dinámicas y volcar sus valores en la plantilla seleccionada.
Crear otra ruta '/cte2' que represente otro archivo de plantilla: 'plantilla2.cte' con los datos nombre, apellido y la fecha/hora provenientes de un objeto.
*/
const express = require('express');
const fs = require('fs');
const PORT = 9191;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.use(express.static(__dirname + '/public'));

// defino el motor de plantilla
app.engine('cte', function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content.toString()
                            .replace('^^titulo$$', ''+ options.titulo +'')
                            .replace('^^mensaje$$', ''+ options.mensaje +'')
                            .replace('^^autor$$', ''+ options.autor +'')
                            .replace('^^version$$', ''+ options.version +'')
                            .replace('^^nombre$$', ''+ options.nombre +'')
                            .replace('^^apellido$$', ''+ options.apellido +'')
                            .replace('^^fecha$$', ''+ options.fecha +'');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'cte'); // registra el motor de plantillas

app.get('/cte1', function (req, res) {
    res.render('plantilla1', {titulo: 'Mi motor de plantillas CTE!', mensaje: 'CTE: Hola Mundo!', autor: 'chuelmo', version: '0.01'});
});

app.get('/cte2', function (req, res) {
  res.render('plantilla2', {nombre: 'Christian', apellido: 'Huelmo', fecha: '01/09/2022 10:54'});
});
