var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
	comment: {type: String, 
		required: [true, 'Comment is required!']},
	_answer: {type: Schema.Types.ObjectId, ref: 'Answer'},
	_user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

var Comment = mongoose.model('Comment', CommentSchema);