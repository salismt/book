angular.module('articles').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/articles', {
				templateUrl: 'app/articles/views/list-articles.client.view.html'
			})
			.when('/articles/create', {
				templateUrl: 'app/articles/views/create-article.client.view.html'
			})
			.when('/articles/:articleId', {
				templateUrl: 'app/articles/views/view-article.client.view.html'				
			})
			.when('/articles/:articleId/edit', {
				templateUrl: 'app/articles/views/edit-article.client.view.html'
			});
	}
]);