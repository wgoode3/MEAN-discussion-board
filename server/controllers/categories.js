var mongoose = require('mongoose');
var Category = mongoose.model('Category');

function CategoriesController(){
  this.index = function(req, res){
  	Category.find({}, function(err, categories){
  	  if(err){
  	  	res.json(err);
  	  }else{
  	  	res.json(categories);
  	  }
  	});
  };
  this.create = function(req, res){
  	var category = new Category(req.body);
  	category.save(function(err, category){
  	  if(err){
  	  	res.json(err);
  	  }else{
  	  	res.json(category);
  	  }
  	});
  };
}
module.exports = new CategoriesController();