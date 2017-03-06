app.factory('topicFactory', ['$http', function($http) {

  function TopicFactory(){
    this.addTopic = function(topic, callback){
      $http.post('/topics', topic).then(function(data){
        callback(data.data);
      });
    }
    this.addCategory = function(category, callback){
      $http.post('/categories', category).then(function(data){
        callback(data.data);
      });
    }
    this.getCategories = function(callback){
      $http.get('/categories').then(function(data){
        callback(data.data);
      });
    }
    this.getTopics = function(callback){
      $http.get('/topics').then(function(data){
        callback(data.data);
      });
    }
    this.getTopic = function(id, callback){
      $http.get(`/topics/${id}`).then(function(data){
        callback(data.data);
      });
    }
    this.answer = function(answer, callback){
      $http.post('/answers', answer).then(function(data){
        callback(data.data);
      });
    }
    this.comment = function(comment, callback){
      $http.post('/comments', comment).then(function(data){
        callback(data.data);
      });
    }
    this.vote = function(id, vote, callback){
      $http.post(`/answers/${id}`, vote).then(function(data){
        callback(data.data);
      });
    }
  }
  return new TopicFactory();
}]);
