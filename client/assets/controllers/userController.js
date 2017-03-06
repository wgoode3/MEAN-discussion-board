app.controller('userController', ['$scope', 'userFactory', '$location', '$cookies', '$routeParams', function($scope, userFactory, $location, $cookies, $rParams) {

	var cookieJar = $cookies.getAll();
	$scope.user = [];
	
	function getUser(){
		userFactory.show($rParams.id, function(data){
			$scope.user = data;
		})
	}
	getUser();

	$scope.logout = function(){
		$cookies.remove('id');
		$cookies.remove('name');
		$location.url('/index');
	}

}]);
