console.log("main.js desde public");

const socket = io();

//Generar instancia socket del lado del Front/Cliente

let usuario;
const chatBox = document.getElementById("chatBox");

//Sweet Alert 2 para generar mensaje de bienvenida
Swal.fire({
    title: "Identifícaque",
    input: "text",
    text: "Username para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "Digia el nombre para continuar";
    },
    allowOutsideClick: false
}).then(result => {
    usuario = result.value
})

chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && chatBox.value.trim().length > 0) {
        socket.emit("mensaje", {
            usuario: usuario, mensaje: chatBox.value
        });
        chatBox.value = "";
    }
});

//Listener de mensajes

socket.on("mensajesLogs", data => {
    const messagesLogs = document.getElementById("messagesLogs");
    let mensajes = "";
    data.forEach(mensaje => {
        mensajes += `
            <div class="message">
                <span class = "user"> ${mensaje.usuario} </span>
                <div class = "text"> ${mensaje.mensaje} </div>
            </div>
            `

    });

    messagesLogs.innerHTML = mensajes;
});
