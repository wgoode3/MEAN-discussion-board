var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

function UsersController(){
  this.register = function(req, res){
  	var user = new User(req.body);
  	if(req.body.password != req.body.confirm_password){
        res.json({errors: {password: {message: "Password must match confirm password"}}});
  	}else{
      if(user.password){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      }
      user.save(function(err, result){
          if(err) {
            res.json(err);
          }else{
            res.json(result);
          }
        });
    }
  };
  this.login = function(req, res){
  	if(!req.body.password && !req.body.email){
      res.json({login: false, errors: {email: {message: 'Email cannot be blank.'}, password: {message: 'Password cannot be blank.'}}});
    }else if(!req.body.password){
      res.json({login: false, errors: {password: {message: 'Password cannot be blank.'}}});
    }else{
      User.findOne({email: req.body.email}, function(err, user){
        console.log('get back a user', user);
        if(user){
          if(bcrypt.compareSync(req.body.password, user.password)){
            res.json({login: true, user: user});
          }else{
            res.json({login: false, errors: {password: {message: 'Wrong Password'}}});
          }
        }else{
          res.json({login: false, errors: {email: {message: 'Email not found ;_;'}}});
        }
      });
    }
  };
  this.show = function(req, res){
  	User.findOne({_id: req.params.id}, function(err, user){
  	  if(err){
  	  	res.json(err);
  	  }else{
  	  	res.json(user);
  	  }
  	});
  };
}
module.exports = new UsersController();