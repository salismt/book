var config = require('./config'),
	cookieParser = require('cookie-parser'),
	passport = require('passport');

module.exports = function (server, io, mongoStore) {
	//intercept handshake request
	io.use(function (socket, next) {
		//use cookieParser to parse handshake request
		cookieParser(config.sessionSecret)(socket.request, {},
			function (err) {
				//get sessionId from mongoStore
				var sessionId = socket.request.signedCookies['connect.sid'];

				mongoStore.get(sessionId, function (err, session) {
					socket.request.session = session;

					//match passport authentication with retrieved sessionId
					passport.initialize()(socket.request, {}, function () {
						passport.session()(socket.request, {}, function () {
							if (socket.request.user) {
								next(null, true);
							}
							else {
								next(new Error('User is not authenticated'), false);
							}
						});
					});
				});
			}
		);
	});

	io.on('connection', function (socket) {
		require('../api/chat/chat.server.controller')(io, socket);
	});
};