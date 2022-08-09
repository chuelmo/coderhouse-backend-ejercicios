function sendPersona() {
    let nombre = document.getElementById("p_nombre").value;
    let apellido = document.getElementById("p_apellido").value;
    let edad = document.getElementById("p_edad").value;
    let persona = {
        "persona" : {
            "nombre": nombre,
            "apellido": apellido,
            "edad": edad
        }
    };

    fetch('/personas', {
        method: 'POST', 
        body: JSON.stringify(persona),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

function sendMascota() {
    let nombre = document.getElementById("m_nombre").value;
    let raza = document.getElementById("m_raza").value;
    let edad = document.getElementById("m_edad").value;
    let mascota = {
        "mascota" : {
            "nombre": nombre,
            "raza": raza,
            "edad": edad
        }
    };

    fetch('/mascotas', {
        method: 'POST', 
        body: JSON.stringify(mascota),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}