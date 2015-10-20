var config			= require('./config'),
	http			= require('http'),
	socketio		= require('socket.io'),
	express 		= require('express'),
	morgan 			= require('morgan'),
	compression		= require('compression'),
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	session 		= require('express-session'),
	MongoStore		= require('connect-mongo')(session),
	flash			= require('connect-flash'),
	passport		= require('passport');
	

module.exports = function (db) {
	var app    = express();
	var server = http.createServer(app);
	var io     = socketio.listen(server);

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

	var mongoStore = new MongoStore({
		db: db.connection.db
	});

	//store the session info in mongodb
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	app.set('views', './server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.set('view cache', true);

	app.use(flash());
	
	app.use(passport.initialize());
	app.use(passport.session());

	require('../api/index/index.server.routes')(app);
	require('../api/users/users.server.routes')(app);
	require('../api/articles/articles.server.routes')(app);

	app.use(express.static('./client'));

	//call the socket.io configuration
	require('./socketio')(server, io, mongoStore);

	return server;
};