
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var shapeways = require('shapeways');

var config = require('./config.json');
var routes = require('./routes');
var auth = require('./routes/auth');

var app = express();

// all environments
app.set('port', process.env.PORT || config.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('shapeways'));
app.use(express.session({secret: 'shapeways'}));
app.use(auth.middleware);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', auth.login);
app.get('/callback', auth.callback);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
