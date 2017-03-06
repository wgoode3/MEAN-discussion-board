var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
	username: {type: String, 
		required: [true, 'Name is required!'],
		unique: [true, 'Name already exists!']},
	email: {type: String, 
		required: [true, 'Email is required!'],
		unique: [true, 'Email already exists!'],
		validate: {
			validator: function( value ) {
				return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/.test( value );
			},
			message: "Email is invalid."
		}
	},
	password: {type: String, 
		required: [true, 'Password is required.'],
		validate: {
          	validator: function( value ) {
            	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,32}/.test( value );
          	},
          	message: "Password must be length 8 or greater with at least 1 number, uppercase, and lowercase letter"
        }
    },
    topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);