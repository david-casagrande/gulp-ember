var express = require('express'),
		http    = require('http')
		app     = express(),
		reload  = require('reload');

app.use(express.static(__dirname + '/dist/test'));
app.use("/app", express.static(__dirname + '/app'));	
app.use("/spec", express.static(__dirname + '/spec'));	
app.use("/dist", express.static(__dirname + '/dist'));	
app.use("/vendor", express.static(__dirname + '/vendor'));	
app.use("/node_modules", express.static(__dirname + '/node_modules'));	

server = http.createServer(app);

reload(server, app);

server.listen(8500, function(){
	console.log('Server is now running on port 8500')
});
