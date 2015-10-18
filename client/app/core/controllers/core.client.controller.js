angular.module('core').controller('CoreCtrl', ['$scope', 'Authentication',
	function ($scope, Authentication) {
		$scope.authentication = Authentication;
	}
]);