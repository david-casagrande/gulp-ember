var express   = require('express'),
		http      = require('http'),
    app       = express(),
    reload    = require('reload'),
    request   = require('request');
 
app.configure(function() {


});

app.all('/api/*', function(req, res, next){
	console.log(req.url)
  var domain  = 'http://localhost:3000',
  		url     = req.url.split('?'),
  		path    = url[0],
  		query   = url[1] ? '?' + url[1] : '',
  		newurl  = domain + path + '.json' + query;	  
	console.log(newurl)

  request(newurl).pipe(res);
});

app.use(express.static(__dirname + '/tmp/dev'));
app.use("/vendor", express.static(__dirname + '/vendor'));
//app.use(express.errorHandler());

var server = http.createServer(app);
reload(server, app);
 
server.listen(8000, function(){
	console.log('Server is now running on port 8000')
});
