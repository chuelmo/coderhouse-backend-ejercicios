/* PROMESAS
Observación: Promise.resolve(arg) devuelve una promesa que siempre se resolverá en forma exitosa, y que devolverá como resultado el valor recibido como argumento.
*/

//Promesas
Promise.resolve(20)
    .then(x => x + 1)
    .then(x => x * 2)
    .then(x => {
        if (x == 22) {
            throw 'Error';
        } else {
            return 80;
        }
    })
    .then(x => 30)
    .then(x => x / 2)
    .then(console.log)
    .catch(console.log)

Promise.resolve(10)
    .then(x => x + 1)
    .then(x => x * 2)
    .then(x => {
        if (x == 22) {
            throw 'Error';
        } else {
            return 80;
        }
    })
    .then(x => 30)
    .then(x => x / 2)
    .then(console.log)
    .catch(console.log)

Promise.resolve(30)
    .then(x => x + 1)
    .then(x => x * 2)
    .then(x => {
        if (x == 22) {
            throw 'Error';
        } else {
            return 80;
        }
    })
    .then(x => 30)
    .then(x => x / 2)
    .then(console.log)
    .catch(console.log)