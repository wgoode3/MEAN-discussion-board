var users = require('../controllers/users.js')
var categories = require('../controllers/categories.js')
var topics = require('../controllers/topics.js')
var answers = require('../controllers/answers.js')
var comments = require('../controllers/comments.js')

module.exports = function(app){
  	
	// users register and login, also show a specific user
	app.post('/users/new', users.register);
	app.post('/users/login', users.login);
	app.get('/users/:id', users.show);

	// retrieve all categories or make a new category
	app.get('/categories', categories.index);
	app.post('/categories', categories.create);

	// show all topics, show a specific topic, create a new topic
	app.get('/topics', topics.index);
	app.get('/topics/:id', topics.show);
	app.post('/topics', topics.create);

	// leave an answer to a topic, or vote up or down an answer
	app.post('/answers', answers.create);
	app.post('/answers/:id', answers.vote);

	// leave a comment on an answer
	app.post('/comments', comments.create);

}