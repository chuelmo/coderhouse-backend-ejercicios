let allProductos = [];
window.addEventListener('load', getAllProducts);
const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let idCarrito = 0;
const productos = [];


if (urlParams.has('id')) {
    idCarrito = urlParams.get('id');
    let h1 = document.getElementById('h1_title');
    h1.innerHTML = `Listado de Productos del Carrito ${idCarrito}`;
    cargarProductos();
} else {
    let h1 = document.getElementById('h1_title');
    h1.innerHTML = 'Esta página no muestra información sin un ID de carrito';
}

function cargarProductos() {
    showProductos([]);
    fetch(`/api/carrito/${idCarrito}/productos`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        res.json()
            .then((response) => {
                if (Array.isArray(response)) {
                    productos.push(...response);
                    showProductos(productos);
                } 
            })
            .catch((e) => console.log(e));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function showProductos(listaDeProductos) {
    div_prod = document.getElementById('productos');
    let html = '';
    if (listaDeProductos.length > 0) {
        html = `
        <table class="table bg-dark">
        <tr>
            <th class="text-warning">Id</th>
            <th class="text-warning">Nombre</th>
            <th class="text-warning">Precio</th>
            <th class="text-warning">Imagen</th>
            <th class="text-warning"></th>
        </tr>`;
        listaDeProductos.forEach(p => {
            html += `
            <tr>
                <td class="text-white">
                    <button type="button" class="btn btn-primary">
                        ${p.id}
                    </button>
                </td>
                <td class="text-white">${p.nombre}</td>
                <td class="text-white">${p.precio}</td>
                <td class="text-white"><img src="${p.fotoUrl}" alt="imagen" height="32"></td>
                <td class="text-white"><button class="btn btn-danger btnDeleteProducto" id="${p.id}">Borrar Producto</button></td>
            </tr>`;
        });
        html += `</table>`;
        html += `<button type="button" class="btn btn-primary" data-bs-toggle="modal" id="addProductos" data-bs-target="#staticBackdrop">Add Productos</button>`;
    } else {
        html = `<p class="mt-3 mb-3 p-3 aviso">No se encontraron productos</p>`;
        html += `<button type="button" class="btn btn-primary" data-bs-toggle="modal" id="addProductos" data-bs-target="#staticBackdrop">Add Productos</button>`;
        
    }
    div_prod.innerHTML = html;
    addEventsToButtons();
}

function addEventsToButtons() {
    document.querySelectorAll('.btnDeleteProducto').forEach(item => {
        item.addEventListener('click', e => {
            idProducto = e.target.getAttribute('id');
            deleteProductFromCarrito(idProducto);
        });
    });
}

async function deleteProductFromCarrito(idProducto) {
    let res = await fetch(`/api/carrito/${idCarrito}/productos/${idProducto}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let respuesta = await res.json();
    location.reload();
}

function showTableProductos(listaDeProductos) {
    const divBodyProduct = document.getElementById('bodyProduct');
    let html = '';
    if (listaDeProductos.length > 0) {
        html = `
        <table class="table bg-dark">
        <tr>
            <th class="text-warning">Id</th>
            <th class="text-warning">Nombre</th>
            <th class="text-warning">Precio</th>
            <th class="text-warning">Imagen</th>
            <th class="text-warning">Agregar</th>
        </tr>`;
        listaDeProductos.forEach(p => {
            html += `
            <tr>
                <td class="text-white">
                    <button type="button" class="btn btn-primary">
                        ${p.id}
                    </button>
                </td>
                <td class="text-white">${p.nombre}</td>
                <td class="text-white">${p.precio}</td>
                <td class="text-white"><img src="${p.fotoUrl}" alt="imagen" height="32"></td>
                <td class="text-white">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="${p.id}">
                    </div>
                </td>
            </tr>`;
        });
        html += `</table>`;
    } else {
        html = `<p class="mt-3 mb-3 p-3 aviso">No se encontraron productos</p>`;
    }
    divBodyProduct.innerHTML = html;
}

async function getAllProducts() {
    allProductos = [];
    showTableProductos([]);
    let res = await fetch('/api/productos', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let respuesta = await res.json();
    if (Array.isArray(respuesta)) {
        allProductos.push(...respuesta);
        showTableProductos(allProductos);
    }
}

const btnAgregarProductos = document.getElementById('btnAgregarProductos');

btnAgregarProductos.addEventListener('click', async () => {
    let ids = [];
    document.querySelectorAll('.form-check-input').forEach(item => {
        if (item.checked) {
            ids.push(item.id);
        }
    });
    console.log('ids: ', ids, ' idCarrito: ', idCarrito);
    const modal = document.getElementById('staticBackdrop');
    let closeModal = bootstrap.Modal.getInstance(modal);
    closeModal.hide();
    const bodyPost = {"ids": ids};
    let res = await fetch(`/api/carrito/${idCarrito}/productos`, {
        method: 'POST', 
        body: JSON.stringify(bodyPost),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await res.json();
    location.reload();
});


