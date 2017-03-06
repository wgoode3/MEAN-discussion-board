var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
	answer: {type: String, 
	required: [true, 'Answer is required!']},
	_topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	up_voters: [{type: Schema.Types.ObjectId, ref: 'User'}],
  down_voters: [{type: Schema.Types.ObjectId, ref: 'User'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

var Answer = mongoose.model('Answer', AnswerSchema);