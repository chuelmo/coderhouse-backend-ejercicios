const socket = io.connect();

const addMessage = () => {
    const msg = {
        name: document.getElementById('name').value,
        message: document.getElementById('message').value
    }
    socket.emit('new-message', msg);
    return false;
}

const boton = document.getElementById('enviar');
boton.addEventListener('click', addMessage);

socket.on('new-chat-message', (msg) => {
    const html = msg.map(m => {
        return (`<div><strong>${m.name}</strong>: <em>${m.message}</em></div>`)
    }).join(' ');
    document.getElementById('divRender').innerHTML = html;
});