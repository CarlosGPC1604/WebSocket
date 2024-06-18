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
		html += "<div><strong>" + elem.usuario +"</strong>:  <em>" + elem.texto+ "</em></div>"
	});
	document.getElementById('message').innerHTML = html;
}

function agregarMensaje(e){
	var mensaje = {
		usuario: document.getElementById("inputNombreUsuario").value,
		texto: document.getElementById("inputMensaje").value,
	};

	socket.emit("nuevo-mensaje", mensaje);
	return false;
}






