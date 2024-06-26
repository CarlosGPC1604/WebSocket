var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/demo", function (req, res){
	res.status(200).send("Hola Mundo!!");
});

var message = [
	{
		usuario: "#System",
		texto: "Bienvenido al chat con NodeJS y Socket.io...",
	},
];

io.on("connection", function(socket){
	console.log("Se unió alguien al Socket...");
	socket.emit("message", message);

	socket.on("nuevo-mensaje", function(data){
		message.push(data);

		io.sockets.emit("message", message);
	})

});

server.listen(8080, function(){
	console.log("Socket ejecutándose en la dirección: http://127.0.0.1:8080");
});