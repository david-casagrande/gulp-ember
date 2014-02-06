var ejs     = require('ejs'),
		express = require('express'),
		fileset = require('fileset'),
		http    = require('http'),
    reload  = require('reload');

var app = express();

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.errorHandler());
	app.set('views', __dirname + '/spec');
	app.engine('html', require('ejs').renderFile);
});

app.use(express.static(__dirname + '/tmp/spec'));
app.use("/app", express.static(__dirname + '/tmp/dev'));
app.use("/vendor", express.static(__dirname + '/vendor'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

app.get('/*', function(req,res,next){
	fileset('spec/**/*.js', function(err, files) {
		var params   = req.params.length > 0 ? new RegExp(req.params[0], 'ig') : false,
				fileList = [];

	  files.map(function(file){
	  	var module = file.replace('spec', 'gulp').split('.')[0];
	  	if(params) {
	  		if(file.match(params)){
	  			fileList.push(module);
	  		}
	  	}
	  	else {
	  		fileList.push(module);
	  	}
	  });
	  res.render('index.ejs', { fileList: fileList });
	});

});


var server = http.createServer(app);
//reload(server, app);

var port = Number(process.env.PORT || 8000);
server.listen(port, function(){
	console.log('Server is now running on port ' + port);
});
