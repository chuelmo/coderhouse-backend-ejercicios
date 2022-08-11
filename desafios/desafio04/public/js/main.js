function sendProducto() {
    let title = document.getElementById("p_title");
    let price = document.getElementById("p_price");
    let thumbnail = document.getElementById("p_thumbnail");
    let producto = {
        "title": title.value,
        "price": price.value,
        "thumbnail": thumbnail.value
    };

    fetch('/api/productos', {
        method: 'POST', 
        body: JSON.stringify(producto),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            console.log('Success:', response);
            title.value = '';
            price.value = '';
            thumbnail.value = '';
         });
}