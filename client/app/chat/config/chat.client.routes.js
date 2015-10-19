angular.module('chat').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/chat', {
				templateUrl: 'app/chat/views/chat.client.view.html'
			});
	}
]);