var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');

function AnswersController(){
	this.create = function(req, res){
		var answer = new Answer(req.body);
		answer.save(function(err, answer){
		if(err){
				res.json(err);
			}else{
				User.findOne({_id: req.body._user}, function(err, user){
					if(err){
						res.json(err);
					}else{
						user.answers.push(answer._id);
						user.save(function(err, user){
							if(err){
								res.json(err);
							}else{
								Topic.findOne({_id: req.body._topic}, function(err, topic){
									if(err){
										res.json(err)
									}else{
										topic.answers.push(answer._id);
										topic.save(function(err, topic){
											if(err){
												res.json(err);
											}else{
												res.json(answer);
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
	this.vote = function(req, res){
		// retreive the answer
		Answer.findOne({_id: req.params.id}, function(err, answer){
			if(err){
				res.json(err);
			}else{
				// remove previous votes from a given user
				for(var i=0; i<answer.up_voters.length; i++){
					if(answer.up_voters[i] == req.body._user){
						answer.up_voters.splice(i, 1);
					}
				}
				for(var i=0; i<answer.down_voters.length; i++){
					if(answer.down_voters[i] == req.body._user){
						answer.down_voters.splice(i, 1);
					}
				}
				// add the vote to the right place
				if(req.body.vote == 'up'){
					answer.up_voters.push(req.body._user);
				}else{
					answer.down_voters.push(req.body._user);
				}
				// save the answer
				answer.save(function(err, answer){
					if(err){
						res.json(err);
					}else{
						res.json(answer);
					}
				});
			}
		});
	}
}
module.exports = new AnswersController();