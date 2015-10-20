var port = 1337;

module.exports = {
	port: port,
	db: 'mongodb://localhost/book-test',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '416680535207576',
		clientSecret: 'b63dea8fe0868b64e9b538dac8899b45',
		callbackURL: 'http://localhost:' + port + '/oauth/facebook/callback'
	},
	twitter: {
		clientID: '5JHqE649yCBQFqMJD0ZkOUPoL',
		clientSecret: 'EYL63AMqVeZouytDE4ug0nzosul6gxYAdPAwMSfnKjgElrmouN',
		callbackURL: 'http://localhost:' + port + '/oauth/twitter/callback'
	}
};