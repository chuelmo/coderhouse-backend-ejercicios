const socket = io.connect();


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
                socket.emit('new-product');
            })
            .catch((e) => console.log(e));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function formatearFecha() {
    let fecha = new Date();
    let fechaConFormato = '[';
    if (fecha.getDate() < 10) {
        fechaConFormato += '0' + fecha.getDate() + '/';
    } else {
        fechaConFormato += fecha.getDate() + '/';
    }
    let mes = fecha.getMonth() + 1;
    if (mes < 10) {
        fechaConFormato += '0' + mes + '/';
    } else {
        fechaConFormato += mes + '/';
    }
    fechaConFormato += fecha.getFullYear() + ' ';
    if (fecha.getHours() < 10) {
        fechaConFormato += '0' + fecha.getHours() + ':';
    } else {
        fechaConFormato += fecha.getHours() + ':';
    }
    if (fecha.getMinutes() < 10) {
        fechaConFormato += '0' + fecha.getMinutes() + ':';
    } else {
        fechaConFormato += fecha.getMinutes() + ':';
    }
    if (fecha.getSeconds() < 10) {
        fechaConFormato += '0' + fecha.getSeconds() + ']';
    } else {
        fechaConFormato += fecha.getSeconds() + ']';
    }
    return fechaConFormato;
}

function ValidateEmail(email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      return true;
    }
    return false;
}

function enviarMensaje() {
    let email = document.getElementById('email');
    if (!ValidateEmail(email.value)) {
        email.value = '';
        return;
    }
    let msg = document.getElementById('mensaje');
    let fechaConformato = formatearFecha();
    let m = {
        "email": email.value,
        "mensaje": msg.value,
        "fecha": fechaConformato
    };
    fetch('/api/mensajes', {
        method: 'POST', 
        body: JSON.stringify(m),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        res.json()
            .then((response) => {
                console.log('Success:', response);
                email.value = '';
                msg.value = '';
                socket.emit('new-message');
            })
            .catch((e) => console.log(e));
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

const boton = document.getElementById('enviar');
boton?.addEventListener('click', enviarDatos);

const btnChat = document.getElementById('enviarMsg');
btnChat?.addEventListener('click', enviarMensaje);

socket.on('all_productos', productos => {
    div_prod = document.getElementById('productos');
    let html = '';
    if (productos.length > 0) {
        html = `
        <table class="table bg-dark">
        <tr>
            <th class="text-warning">Nombre</th>
            <th class="text-warning">Precio</th>
            <th class="text-warning">Imagen</th>
        </tr>`;
        productos.forEach(p => {
            html += `
            <tr>
                <td class="text-white">${p.title}</td>
                <td class="text-white">${p.price}</td>
                <td class="text-white"><img src="${p.thumbnail}" alt="imagen" height="64"></td>
            </tr>`;
        });
        html += `</table>`;
    } else {
        html = `<p class="mt-3 mb-3 p-3 aviso">No se encontraron productos</p>`;
    }
    div_prod.innerHTML = html;
});

socket.on('all_messages', mensajes => {
    div_msg = document.getElementById('chat');
    if (mensajes.length > 0) {
        let html = '<p>';
        mensajes.forEach(m => {
            html += `<span class="text-primary">${m.email}</span>
            <span class="text-danger">${m.fecha}</span>
            <span class="text-success">${m.mensaje}</span><br>`;
        });
        html += '</p>';
        div_msg.innerHTML = html;
    }
});