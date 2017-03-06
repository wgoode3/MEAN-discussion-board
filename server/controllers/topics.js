var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

function TopicsController(){
  this.index = function(req, res){
  	Topic.find({}).populate('_user _category').exec(function(err, topics){
	  if(err){
	    res.json(err);
	  }else{
	    res.json(topics);
	  }
  	});
  };
  this.show = function(req, res){
  	Topic.findOne({_id: req.params.id}).populate('_user _category answers').exec(function(err, topic){
  	  if(err){
        res.json(err);
      }else{
        Topic.populate(topic, {path: 'answers._user', model: 'User'}, function(err, topic){
          if(err){
            res.json(err);
          }else{
            Topic.populate(topic, {path: 'answers.comments', model: 'Comment'}, function(err, topic){
              if(err){
                res.json(err);
              }else{
                Topic.populate(topic, {path: 'answers.comments._user', model: 'User'}, function(err, topic){
                  if(err){
                    res.json(err);
                  }else{
                    res.json(topic);
                  }
                });
              }
            });
          }
        });
      }
    });
  };
  this.create = function(req, res){
  	var topic = new Topic(req.body);
  	topic.save(function(err, topic){
  	  if(err){
  	  	res.json(err);
  	  }else{
  	  	User.findOne({_id: req.body._user}, function(err, user){
  	  	  if(err){
  	  	  	res.json(err);
  	  	  }else{
  	  	  	user.topics.push(topic._id);
  	  	    user.save(function(err, user){
  	  	  	  if(err){
  	  	        res.json(err);
  	  	  	  }else{
  	  	  	    res.json(topic);
  	  	  	  }
  	  	    });
  	  	  }
  	  	});
  	  }
  	});
  };
}
module.exports = new TopicsController();