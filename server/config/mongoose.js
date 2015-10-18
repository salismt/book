var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function () {
	var db = mongoose.connect(config.db);

	require('../api/users/user.server.model');
	require('../api/articles/article.server.model');

	return db;
};