var config			= require('./config'),
	express 		= require('express'),
	morgan 			= require('morgan'),
	compression		= require('compression'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	session 		= require('express-session'),
	flash			= require('connect-flash'),
	passport		= require('passport');

module.exports = function () {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compression)();
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('views', './views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	app.use(flash());
	
	app.use(passport.initialize());
	app.use(passport.session());

	require('../api/index/index.server.routes')(app);
	require('../api/users/users.server.routes')(app);
	require('../api/articles/articles.server.routes')(app);

	app.use(express.static('../client'));
	return app;
};