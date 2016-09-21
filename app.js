var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Setting up view engine
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');
	
app.use(express.static(__dirname+'/client'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Genre = require('./model/genre');
Book = require('./model/book');


//Connect to database
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.render('index');
});


//Return all books
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

//Add book
app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//Get book by id
app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// Update book
app.put('/api/books/:_id', function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

// Delete book
app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;
	Book.removeBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

///////////////////////////////////GENRE//////////////////////////////////////////////////////

//Return all Genre
app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

// Add genre
app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

//Get genre by id
app.get('/api/genres/:_id', function(req, res){
	Genre.getGenreById(req.params._id, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// Update genre
app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

// Delete genre
app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	Genre.removeGenre(id, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


app.listen(8000);
console.log('Running on port 8000...');


