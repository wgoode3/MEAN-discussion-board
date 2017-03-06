app.controller('topicController', ['$scope', 'topicFactory', '$location', '$cookies', '$routeParams', function($scope, topicFactory, $location, $cookies, $rParams) {

	var cookieJar = $cookies.getAll();
	
	$scope.topic = {};
	$scope.newAnswer = {};
	$scope.newComment = [];
	$scope.comment_errors = [];

	function getTopic(){
		topicFactory.getTopic($rParams.id, function(data){
			$scope.topic = data;
		})
	}
	getTopic();

	$scope.answer = function(){
		var answer = $scope.newAnswer
		answer._user = cookieJar.id;
		answer._topic = $rParams.id;
		topicFactory.answer(answer, function(data){
			if(data.errors){
				$scope.answer_errors = data.errors;
			}else{
				$scope.answer_errors = [];
			}
			$scope.newAnswer = {};
			getTopic();
		})
	}

	$scope.comment = function(id){
		var comment = {};
		comment.comment = $scope.newComment[id];
		comment._user = cookieJar.id;
		comment._answer = id;
		topicFactory.comment(comment, function(data){
			if(data.errors){
				$scope.comment_errors[id] = data.errors;
			}else{
				$scope.comment_errors = [];
			}
			$scope.newComment = [];
			getTopic();
		})
	}

	$scope.vote = function(id, direction){
		var vote = {};
		direction == 'up' ? vote.vote = 'up' : vote.vote = 'down';
		vote._user = cookieJar.id;
		topicFactory.vote(id, vote, function(data){
			getTopic();
		})
	}

	$scope.logout = function(){
		$cookies.remove('id');
		$cookies.remove('name');
		$location.url('/index');
	}

}]);
