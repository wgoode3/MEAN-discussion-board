app.controller('loginController', ['$scope','userFactory','$location', '$cookies', function($scope, userFactory, $location, $cookies) {

  $scope.login = function(){
    userFactory.login($scope.user, function(data){
      if(data.login){
        $cookies.put('id', data.user._id);
        $cookies.put('name', data.user.username);
        $location.url('/dashboard');
      }else{
        $scope.errors = data.errors;
      }
    });
  }
}]);
