/*
Ejemplo Mutabilidad
Por ejemplo, una constante se puede asignar a un objeto con determinadas propiedades. Aunque la constante no se pueda asignar a un nuevo valor, sí se puede cambiar el valor de sus propiedades.
*/
const user = {name: 'Juan'};
user.name = 'Manolo'; // Esto es posible
console.log(user.name); // Manolo