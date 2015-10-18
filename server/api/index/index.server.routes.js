var index = require('./index.server.controller');

module.exports = function (app) {
	app.route('/')
		.get(index.render);
};