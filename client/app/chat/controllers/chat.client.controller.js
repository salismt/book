angular.module('chat').controller('ChatCtrl', ['$scope', 'Socket', 
	function ($scope, Socket) {
		//empty array for messages
		$scope.messages = [];

		//bind the socket on chatMessage
		Socket.on('chatMessage', function (message) {
			$scope.messages.push(message);
		});

		//sendMessage emit
		$scope.sendMessage = function () {
			var message = {
				text: this.messageText
			};

			Socket.emit('chatMessage', message);

			this.messageText = '';
		};

		//built in $destroy event to remove chatMessage event listener
		$scope.$on('$destroy', function() {
			Socket.removeListener('chatMessage');
		});
	}
]);