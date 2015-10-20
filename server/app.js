process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express 	= require('./config/express'),
	config 		= require('./config/config'),
	mongoose 	= require('./config/mongoose'),
	passport	= require('./config/passport');

var db 	= mongoose(),
	app = express(db),
	passport = passport();


app.listen(config.port);

module.exports = app;
console.log('server is running on port' + config.port);
