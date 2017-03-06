app.factory('userFactory', ['$http', function($http) {

  var users = [];
  var user = {};
  function UserFactory(){
    this.create = function(newuser, callback){
      $http.post('/users/new', newuser).then(function(data){
        callback(data.data);
      });
    };
    this.show = function(id, callback){
      $http.get(`/users/${id}`).then(function(data){ 
        callback(data.data);
      });
    };
    this.login = function(user, callback){
      $http.post('/users/login', user).then(function(data){
        callback(data.data);
      });
    }
  }
  return new UserFactory();
}]);
