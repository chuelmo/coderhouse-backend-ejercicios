/*
Considere la siguiente frase: ‘Frase inicial’
Realizar una aplicación de servidor node.js con express que incorpore las siguientes rutas:
GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1.
POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).

Aclaraciones:
Utilizar Postman para probar la funcionalidad.
El servidor escuchará peticiones en el puerto 8080 y mostrará en la consola un mensaje de conexión que muestre dicho puerto, junto a los mensajes de error si ocurriesen.

*/
const express = require('express');
const PORT = 8080;

const app = express();
const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const frase = ['Frase', 'inicial'];

app.get('/api/frase', (req, res) => {
    res.status(200).json({ "frase": frase.join(" ") });
});

app.get('/api/palabras/:pos', (req, res) => {
    if (isNaN(parseInt(req.params.pos))) {
        res.status(400).json({"error": "El parámetro no es un número"});
    } else {
        const id = parseInt(req.params.pos);
        if (id > frase.length || id < 1) {
            res.status(400).json({"error": "El parámetro está fuera de rango"});
        } else {
            res.status(200).json({"buscada": frase[id - 1]});
        }
    }
});

app.post('/api/palabras', (req, res) => {
    if (req.body.palabra) {
        let palabra = req.body.palabra.trim();
        if (palabra.length === 0) {
            res.status(400).json({"error": "Se esperaba una palabra"});
        } else {
            frase.push(palabra);
            res.status(200).json({"agregada": palabra, "pos": frase.length});
        }
    } else {
        res.status(400).json({"error": "La petición no es correcta"});
    }
});

app.put('/api/palabras/:pos', (req, res) => {
    if (isNaN(parseInt(req.params.pos))) {
        res.status(400).json({"error": "El parámetro no es un número"});
    } else {
        const pos = parseInt(req.params.pos);
        if (pos > frase.length || pos < 1) {
            res.status(400).json({"error": "El parámetro está fuera de rango"});
        } else {
            if (req.body.palabra) {
                let palabra = req.body.palabra.trim();
                if (palabra.length === 0) {
                    res.status(400).json({"error": "Se esperaba una palabra"});
                } else {
                    let anterior = frase[pos - 1];
                    frase[pos - 1] = palabra;
                    res.status(200).json({"actualizada": palabra, "anterior": anterior});
                }
            } else {
                res.status(400).json({"error": "La petición no es correcta"});
            }
        }
    }
});

app.delete('/api/palabras/:pos', (req, res) => {
    if (isNaN(parseInt(req.params.pos))) {
        res.status(400).json({ "error": "El parámetro no es un número" });
    } else {
        const pos = parseInt(req.params.pos);
        if (pos > frase.length || pos < 1) {
            res.status(400).json({ "error": "El parámetro está fuera de rango" });
        } else {
            let palabra = frase[pos - 1];
            let original = [...frase];
            frase.splice(pos - 1, 1);
            res.status(200).json({"original_array": original, "word_deleted": palabra, "new_array": frase});
        }
    }
});