var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
	category: {type: String, 
		required: [true, 'Category is required!'],
		unique: [true, 'Category already exists!']}
}, {timestamps: true});

var Category = mongoose.model('Category', CategorySchema);