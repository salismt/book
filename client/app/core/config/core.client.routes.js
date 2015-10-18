angular.module('core').config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/core/views/core.client.view.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);