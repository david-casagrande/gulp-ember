var express = require('express'),
		http    = require('http')
		app     = express(),
		reload  = require('reload');

app.use(express.static(__dirname + '/app'));	
app.use("/dist", express.static(__dirname + '/dist'));	
app.use("/vendor", express.static(__dirname + '/vendor'));	

server = http.createServer(app);

reload(server, app);

server.listen(3000, function(){
	console.log('Server is now running on port 3000')
});
