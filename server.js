var express = require('express'),
		http    = require('http')
		app     = express(),
		reload  = require('reload');

app.use(express.static(__dirname + '/tmp/dev'));
app.use("/vendor", express.static(__dirname + '/vendor'));	

server = http.createServer(app);

reload(server, app);

server.listen(8000, function(){
	console.log('Server is now running on port 8000')
});
