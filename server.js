var express = require('express'),
		http    = require('http')
		app     = express(),
		reload  = require('reload');


app.use(express.static(__dirname + '/tmp/dev'));
app.use("/app", express.static(__dirname + '/app'));
app.use("/dist", express.static(__dirname + '/dist'));
app.use("/vendor", express.static(__dirname + '/vendor'));	
app.use("/tmp", express.static(__dirname + '/tmp'));

server = http.createServer(app);

reload(server, app);

server.listen(8000, function(){
	console.log('Server is now running on port 8000')
});
