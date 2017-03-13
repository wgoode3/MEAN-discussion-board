app.controller('dashboardController', ['$scope', 'userFactory', 'topicFactory', '$location', '$cookies', function($scope, userFactory, topicFactory, $location, $cookies) {

	var cookieJar = $cookies.getAll();
	$scope.newCategory = {};
	$scope.categories = [];
	$scope.topic = {};
	$scope.topics = [];

	if(!cookieJar.id){
		$location.url('/index')
	}

	$scope.addCategory = function(){
		var category = $scope.newCategory
		category._user = cookieJar.id;
		topicFactory.addCategory(category, function(data){
			if(data.errors){
				$scope.category_errors = data.errors;
			}else{
				$scope.category_errors = [];
			}
			$scope.newCategory = {};
			getCategories();
		})
	}

	function getCategories(){
		topicFactory.getCategories(function(data){
			$scope.categories = data;
		})
	}
	getCategories();

	$scope.addTopic = function(){
		var topic = $scope.topic;
		topic._user = cookieJar.id;
		console.log('this is the topic', topic);
		topicFactory.addTopic(topic, function(data){
			if(data.errors){
				$scope.topic_errors = data.errors;
			}else{
				$scope.topic_errors = [];
			}
			$scope.topic = {};
			getTopics();
		})
	}

	function getTopics(){
		topicFactory.getTopics(function(data){
			$scope.topics = data;
		})
	}
	getTopics();

	$scope.logout = function(){
		$cookies.remove('id');
		$cookies.remove('name');
		$location.url('/index');
	}
	
}]);
