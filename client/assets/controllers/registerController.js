app.controller('registerController', ['$scope','userFactory','$location', '$cookies', function($scope, userFactory, $location, $cookies) {

  $scope.register = function(){
    userFactory.create($scope.user, function(data){
      if(data.errors){
        $scope.errors = data.errors;
      }else{
        $cookies.put('id', data._id);
        $cookies.put('name', data.username);
        $location.url('/dashboard');
      }
    });
  }
}]);