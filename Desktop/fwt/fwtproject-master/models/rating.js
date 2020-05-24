var mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    // user id
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
		required: true
    },
    // name of trek
    location:{
        type: String,
		required: true
    },
    // actual user review
	a_rating:{
		type: Number
	}
});

const Rating = module.exports = mongoose.model('user_ratings', RatingSchema);