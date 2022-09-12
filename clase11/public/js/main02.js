const socket = io.connect();

const input = document.getElementById('entrada');
input.addEventListener('input', () => {
    socket.emit('mensajeEnviado', input.value);
});

socket.on('mensajesRecibidos', (msg) => {
    document.getElementById('pRender').innerHTML = msg;
});