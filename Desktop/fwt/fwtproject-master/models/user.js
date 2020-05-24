// user database schema

var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password:{
        type: String,
       required: true
    },
    first_name:{
        type: String,
       required: true
    },
    last_name:{
        type: String,
	   required: true
    }
});

const User = module.exports = mongoose.model('user_logins', UserSchema);