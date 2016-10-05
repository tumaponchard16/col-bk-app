var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//Genre schema
var bookSchema = new Schema({
	title:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	genre:{ 
		type: Schema.Types.ObjectId, 
		ref: 'Genre' 
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

//Get Books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

//Get Book by ID
module.exports.getBookById = function(id, callback){
	Book.findById(id, callback);
}

//Add book
module.exports.addBook = function(book, callback){
	Book.create(book, callback);
}

//Update book
module.exports.updateBook = function(id, book, options, callback){
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		img_url:book.img_url,
		buy_url:book.buy_url
	};
	Book.findOneAndUpdate(query, update, options, callback);
}

//Delete book
module.exports.removeBook = function(id, callback){
	var query = {_id: id};
	Book.remove(query, callback);
}