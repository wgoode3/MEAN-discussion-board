var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new mongoose.Schema({
	topic: {type: String, 
		required: [true, 'Topic is required!'],
		unique: [true, 'Topic already exists!']},
	description: {type: String, required: [true, 'Description is required']},
	_category: {type: Schema.Types.ObjectId, ref: 'Category'},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps: true});

var Topic = mongoose.model('Topic', TopicSchema);