function enviarDatos() {
    let nombre = document.getElementById('name');
    let apellido = document.getElementById('apellido');
    let edad = document.getElementById('edad');
    let persona = {
        "nombre": nombre.value,
        "apellido": apellido.value,
        "edad": edad.value
    };
    fetch('/personas', {
        method: 'POST', 
        body: JSON.stringify(persona),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        res.json()
            .then((response) => {
                console.log('Success:', response);
                nombre.value = '';
                apellido.value = '';
                edad.value = '';
                location.reload();
            })
            .catch((e) => console.log(e));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const boton = document.getElementById('enviar');
boton.addEventListener('click', enviarDatos);