// Ejemplo de ejecución Asincrónica.

function hacerTarea(num, cb) {
    console.log(`haciendo tarea ${num}`);
    setTimeout(cb, 100);
}

console.log('Inicio de tareas ...');
hacerTarea(1, () => {
    hacerTarea(2, () => {
        hacerTarea(3, () => {
            hacerTarea(4, () => {
                console.log('fin de tareas');
            });
        });
    });
});

console.log('Otras tareas ...');