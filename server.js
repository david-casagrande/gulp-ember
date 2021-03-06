var express = require('express'),
		http    = require('http'),
    reload  = require('reload'),
    request = require('request');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.errorHandler());
});

/*
app.all('/api/*', function(req, res, next){
  var domain  = 'http://localhost:3000',
      url     = req.url.split('?'),
      path    = url[0],
      query   = url[1] ? '?' + url[1] : '';

  var reqProxy = {
    body:   req.body ? req.body : null,
    json:   true,
    method: req.method,
    uri:    domain + path + query
  };

  request(reqProxy).pipe(res);
});
*/

app.use(express.static(__dirname + '/public'));
app.use("/vendor", express.static(__dirname + '/vendor'));
app.use("/assets", express.static(__dirname + '/tmp/assets'));

var server = http.createServer(app);
reload(server, app);

var port = Number(process.env.PORT || 8000);
server.listen(port, function(){
	console.log('Server is now running on port ' + port);
});
