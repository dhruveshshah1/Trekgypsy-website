var mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    // user id
    user_id:{
        type: mongoose.Schema.Types.ObjectId, // check syntax
		required: true
    },
    // name of trek
    location:{
        type: String,
		required: true
    },
    // actual user review
	a_review:{
		type: String
	}
});

const Review = module.exports = mongoose.model('user_reviews', BlogSchema);