var passport = require('passport'),
	url		= require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../api/users/users.server.controller');

module.exports = function () {
	passport.use(new FacebookStrategy(
		{
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			passReqToCallback: true,
			profileFields: ["id", "email", "gender", "link", "locale", "name", "timezone", "updated_time", "verified"]
		},
		function (req, accessToken, refreshToken, profile, done) {
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				provider: 'facebook',
				providerId: profile.id,
				providerData: providerData
			};

			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};