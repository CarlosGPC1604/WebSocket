var socket = io.connect("http://127.0.0.1:8080", { ForceNew: true, transports : ['websocket'] });

socket.on('connect', () => {
    console.log('Conexión establecida con el servidor');
});

socket.on("message", function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = "";
	data.forEach(function(elem, index){
		if(elem.usuario === "#System"){
			html += "<div class=\"systemMessage\"><strong>" + elem.usuario +"</strong>:  <em>" + elem.texto+ "</em></div>"
		} else {
		html += "<div><strong>" + elem.usuario +"</strong>:  <em>" + elem.texto+ "</em></div>"
		}
	});
	document.getElementById('message').innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
	// Obtener todos los inputs de texto
	const inputs = document.querySelectorAll("input[type='text']");
	const textarea = document.querySelector("textarea");

	inputs.forEach((input, index) => {
		input.addEventListener("keydown", function (event) {
			if (event.key === "Enter") {
				event.preventDefault();
				const nextInput = inputs[index + 1];
				if (nextInput) {
					nextInput.focus();
				} else {
					textarea.focus();
				}
			}
		});
	});

	textarea.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			document.querySelector("input[type='submit']").click();
		}
	});
});


function scrollToBottom() {
    const contenedor = document.getElementById('messagesContenedor');
    contenedor.scrollTop = contenedor.scrollHeight;
}

function agregarMensaje(e){
	var mensaje = {
		usuario: document.getElementById("inputNombreUsuario").value,
		texto: document.getElementById("inputMensaje").value,
	};

	document.getElementById("inputMensaje").value = "";

	socket.emit("nuevo-mensaje", mensaje);
	scrollToBottom();
	return false;
}