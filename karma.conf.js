module.exports = function (config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			'client/lib/angular/angular.js',
			'client/lib/angular-resource/angular-resource.js',
			'client/lib/angular-route/angular-route.js',
			'client/lib/angular-mocks/angular-mocks.js',
			'client/app/app.js',
			'client/app/*[!lib]*/*.js',
			'client/app/*[!lib]*/*[!tests]*/*.js',
			'client/app/*[!lib]*/tests/unit/*.js'
		],
		reporters: ['progress'],
		browsers: ['PhantomJS'],
		captureTimeout: 6000,
		singleRun: true
	});
};