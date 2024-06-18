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
		usuario: "Jorge",
		texto: "Hola! que tal?",
	},
	{
		usuario: "Maria",
		texto: "Muy bien y tu?",
	}
];

io.on("connection", function(socket){
	console.log("Alguien se conecto al Socket");
	socket.emit("message", message);

	socket.on("nuevo-mensaje", function(data){
		message.push(data);

		io.sockets.emit("message", message);
	})

});

server.listen(8080, function(){
	console.log("Servidor corriendo en http://127.0.0.1:8080");
});