var options = require('optimist')
    .default('port', 3000)
    .demand('thriftFile')
    .argv;
var thrift_compiler = require('child_process')
        .exec('thrift --gen js:node ' + options.thriftFile,
                function(error, stdout, stderr) {
                    if (error) {
                        throw new Error('Thrift compile error! ' + error);
                    }
                    app.listen(options.port);
                    console.log(
                        "Express server listening on port %d in %s mode",
                        app.address().port, app.settings.env
                    );
                });

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

