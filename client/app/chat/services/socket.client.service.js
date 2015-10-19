angular.module('chat').service('Socket', ['Authentication', '$location', '$timeout', 
	function (Authentication, $location, $timeout) {
		if (Authentication.user) {
			this.socket = io();
		}
		else {
			$location.path('/');
		}

		//set on binding event
		this.on = function (eventName, callback) {
			if (this.socket) {
				this.socket.on(eventName, function (data) {
					$timeout(function () {
						callback(data);
					});
				});
			}
		};

		//set emit firing event
		this.emit = function (eventName, data) {
			if (this.socket) {
				this.socket.emit(eventName, data);
			}
		};

		this.removeListener = function (eventName) {
			if (this.socket) {
				this.socket.removeListener(eventName);
			}
		};
	}
]);