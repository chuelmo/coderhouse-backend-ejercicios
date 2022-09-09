const productos = [];
let oneProduct = {};
window.addEventListener('load', getAllProducts);

function getAllProducts() {
    showProductos([]);
    fetch('/api/productos', {
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

function enviarDatos() {
    let nombre = document.getElementById('name');
    let precio = document.getElementById('price');
    let urlfoto = document.getElementById('url');
    let desc = document.getElementById('desc');
    let codigo = document.getElementById('codigo');
    let stock = document.getElementById('stock');
    let producto = {
        "nombre": nombre.value,
        "precio": precio.value,
        "fotoUrl": urlfoto.value,
        "descripcion": desc.value,
        "codigo": codigo.value,
        "stock": stock.value
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
                desc.value = '';
                codigo.value = '';
                stock.value = '';
                location.reload();
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
        </tr>`;
        listaDeProductos.forEach(p => {
            html += `
            <tr>
                <td class="text-white">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-prod-id="${p.id}" data-bs-target="#staticBackdrop">
                        ${p.id}
                    </button>
                </td>
                <td class="text-white">${p.nombre}</td>
                <td class="text-white">${p.precio}</td>
                <td class="text-white"><img src="${p.fotoUrl}" alt="imagen" height="32"></td>
            </tr>`;
        });
        html += `</table>`;
    } else {
        html = `<p class="mt-3 mb-3 p-3 aviso">No se encontraron productos</p>`;
    }
    div_prod.innerHTML = html;
}

async function getOneProduct(id) {
    let res = await fetch(`/api/productos/${id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let respuesta = await res.json();
    return respuesta;
}

function generateProductDetail(p) {
    html = `<form>
    <div class="mb-3">
      <label for="name_detail" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="name_detail" value="${p.nombre}"/>
    </div>
    <div class="mb-3">
      <label for="desc_detail" class="form-label">Descripción</label>
      <input type="text" class="form-control" id="desc_detail" value="${p.descripcion}"/>
    </div>
    <div class="mb-3">
      <label for="codigo_detail" class="form-label">Código</label>
      <input type="text" class="form-control" id="codigo_detail" value="${p.codigo}"/>
    </div>
    <div class="mb-3">
      <label for="url_detail" class="form-label">Foto URL</label>
      <input type="text" class="form-control" id="url_detail" value="${p.fotoUrl}"/>
    </div>
    <div class="mb-3">
      <label for="price_detail" class="form-label">Precio</label>
      <input type="number" class="form-control" id="price_detail" value="${p.precio}"/>
    </div>
    <div class="mb-3">
      <label for="stock_detail" class="form-label">Stock</label>
      <input type="number" class="form-control" id="stock_detail" value="${p.stock}"/>
    </div>
  </form>`;
  return html;
}

const modal = document.getElementById('staticBackdrop');

modal?.addEventListener('show.bs.modal', async (e) => {
    let id = e.relatedTarget.getAttribute('data-prod-id');
    console.log(`Se abrió la ventana de detalle del producto con el id: ${id}`);
    const divBodyProduct = document.getElementById('bodyProduct');
    oneProduct = await getOneProduct(id);
    divBodyProduct.innerHTML = generateProductDetail(oneProduct);
});

async function updateProduct() {
    console.log('Actualizamos el producto!');
    let closeModal = bootstrap.Modal.getInstance(modal);
    let producto = {};
    producto.nombre = document.getElementById('name_detail').value;
    producto.descripcion = document.getElementById('desc_detail').value;
    producto.codigo = document.getElementById('codigo_detail').value;
    producto.fotoUrl = document.getElementById('url_detail').value;
    producto.precio = document.getElementById('price_detail').value;
    producto.stock = document.getElementById('stock_detail').value;
    closeModal.hide();
    let res = await fetch(`/api/productos/${oneProduct.id}`, {
        method: 'PUT',
        body: JSON.stringify(producto), 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let respuesta = await res.json();
    location.reload();
}

async function deleteProduct() {
    console.log('Se borra el producto!');
    let closeModal = bootstrap.Modal.getInstance(modal);
    closeModal.hide();
    let res = await fetch(`/api/productos/${oneProduct.id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let respuesta = await res.json();
    location.reload();
}

const boton = document.getElementById('enviar');
boton?.addEventListener('click', enviarDatos);

const btnUpdate = document.getElementById('btnUpdate');
btnUpdate?.addEventListener('click', updateProduct);

const btnDelete = document.getElementById('btnDelete');
btnDelete?.addEventListener('click', deleteProduct);
