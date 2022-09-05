function enviarDatos() {
    let nombre = document.getElementById('name');
    let precio = document.getElementById('price');
    let urlfoto = document.getElementById('url');
    let producto = {
        "title": nombre.value,
        "price": precio.value,
        "thumbnail": urlfoto.value
    };

    fetch('/api/productos', {
        method: 'POST', 
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        res.json()
            .then((response) => {
                console.log('Success:', response);
                nombre.value = '';
                precio.value = '';
                urlfoto.value = '';
                location.reload();
            })
            .catch((e) => console.log(e));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const boton = document.getElementById('enviar');
if (boton) {
    boton.addEventListener('click', enviarDatos);
}
