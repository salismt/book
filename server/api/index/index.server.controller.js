exports.render = function (req, res, next) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);
	}

	req.session.lastVisit = new Date();

	res.render('index', {
		title: 'EJS index rendering',
		user: JSON.stringify(req.user)
	});
};