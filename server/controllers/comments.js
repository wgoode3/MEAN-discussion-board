var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');

function CommentsController(){
  this.create = function(req, res){
  	var comment = new Comment(req.body);
  	comment.save(function(err, comment){
  	  if(err){
  	  	res.json(err);
  	  }else{
  	  	User.findOne({_id: req.body._user}, function(err, user){
  	  	  if(err){
  	  	  	res.json(err);
  	  	  }else{
  	  	  	user.comments.push(comment._id);
  	  	  	user.save(function(err, user){
  	  	  	  if(err){
  	  	  		  res.json(err);
  	  	  	  }else{
  	  	  		  Answer.findOne({_id: req.body._answer}, function(err, answer){
                  if(err){
                    res.json(err);
                  }else{
                    answer.comments.push(comment._id);
                    answer.save(function(err, data){
                      if(err){
                        res.json(err);
                      }else{
                        res.json(comment);
                      }
                    });
                  }
                });
  	  	  	  }
  	  	  	});
  	  	  }
  	  	});
  	  }
  	});
  }
}
module.exports = new CommentsController();