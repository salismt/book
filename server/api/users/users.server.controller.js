var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function (err) {
	var message = '';

	//MongoDB indexing error handling
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = "Username already exists";
				break;
			default:
				message = "Something went wrong";
		}
	}
	//mongoose validation error
	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				message = err.errors[errName].message;
		}
	}

	return message;
};

exports.renderLogin = function (req, res, next) {
	if (!req.user) {
		res.status(401).render('login', {
			title: 'Login Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.status(200).redirect('/');
	}
};

exports.renderSignup = function (req, res, next) {
	if (!req.user) {
		res.status(401).render('signup', {
			title: 'Sign Up Form',
			messages: req.flash('error')
		});
	}
	else {
		res.status(200).redirect('/');
	}
};

exports.signup = function (req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;

		user.provider = 'local';

		user.save(function (err) {
			if (err) {
				message = getErrorMessage(err);
				req.flash('error', message);
				return res.status(401).redirect('/signup');
			}
			else {
				//Passport module & used to establish a success login session
				req.login(user, function (err) {
					if (err) {
						return next(err);
					}
					else {
						return res.status(200).redirect('/');
					}
				});
			}
		});
	}
	else {
		return res.status(200).redirect('/');
	}
};

exports.signout = function (req, res) {
	req.logout();
	res.status(200).redirect('/');
};

exports.saveOAuthUserProfile = function (req, profile, done) {
	User.findOne(
		{
			provider: profile.provider,
			providerId: profile.providerId
		},
		function (err, user) {
			if (err) {
				return done(err);
			}
			else {
				if (!user) {
					var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

					User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
						profile.username = availableUsername;

						user = new User(profile);
						user.save(function (err) {
							if (err) {
								var message = getErrorMessage(err);
								req.flash('error');
								return res.redirect('/signup');
							}
							else {
								return done(err, user);
							}
						});
					});
				}
				else {
					return done(err, user);
				}
			}
		}
	);

};

exports.create = function (req, res, next) {
	var user = new User(req.body);

	user.save(function (err) {
		if (err) {
			return next(err);
		}
		else {
			return res.status(201).json(user);
		}
	});
};

exports.list = function (req, res, next) {
	User.find({}, function (err, users) {
		if (err) {
			return next(err);
		}
		else {
			return res.status(200).json(users);
		}
	});
};

exports.read = function (req, res, next) {
	res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
	User.findOne(
		{_id: id},
		function (err, user) {
			if (err) {
				return next(err);
			}
			else {
				req.user = user;
				return next();
			}
		}
	);
};

exports.update = function (req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
		if (err) {
			return next(err);
		}
		else {
			return res.status(201).json(user);
		}
	});
};

exports.delete = function (req, res, next) {
	req.user.remove(function (err) {
		if (err) {
			return next(err);
		}
		else {
			return res.status(200).json(req.user);
		}
	});
};

exports.requiresLogin = function (req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	else {
		return next();
	}
};