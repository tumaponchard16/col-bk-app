var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Genre schema
var genreSchema = Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

//Get Genres
/*module.exports.getGenres = function(callback, limit){
	Genre.find(callback).limit(limit);
}*/

//Get genre by ID
/*module.exports.getGenreById = function(id, callback){
	Genre.findById(id, callback);
}*/

//Get Books by Genres
/*module.exports.getBooksByGenre = function(id, callback){
	Genre.find({books: id}, callback);
}*/

//Add Genre
module.exports.addGenre = function(genre, callback){
	Genre.create(genre, callback);
}

//Update Genre
module.exports.updateGenre = function(id, genre, options, callback){
	var query = {_id: id};
	var update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}

//Delete Genre
module.exports.removeGenre = function(id, callback){
	var query = {_id: id};
	Genre.remove(query, callback);
}
