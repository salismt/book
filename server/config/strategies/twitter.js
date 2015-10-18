var passport = require('passport'),
	url = require('url'),
	TwitterStrategy = require('passport-twitter').Strategy,
	config = require('../config'),
	users = require('../../api/users/users.server.controller');

module.exports = function () {
	passport.use(new TwitterStrategy(
		{
			consumerKey: config.twitter.clientID,
			consumerSecret: config.twitter.clientSecret,
			callbackURL: config.twitter.callbackURL,
			passReqToCallback: true
		},
		function (req, token, tokenSecret, profile, done) {
			var providerData = profile._json;
			providerData.token = token;
			providerData.tokenSecret = tokenSecret;

			var providerUserProfile = {
				fullName: profile.displayName,
				username: profile.username,
				provider: 'twitter',
				providerId: profile.id,
				providerData: providerData
			};
			console.log(providerUserProfile);
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};