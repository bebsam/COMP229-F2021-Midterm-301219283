//File Name: books.js
//Student Name: Bebin Samuel
//Student ID: 301219283 
//Date:28/10/21

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  book.find( (err, books) => {   // find all books in the books collection
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {         // show the book details view
    title: "Add a new Book",
    books: '', 
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let newBook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
    
   });

   book.create(newBook, (err, book) => {
     if(err) {
       console.log(err);
       res.end(err);
     } else {
       res.redirect('/books');
     }
   });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  try {
    let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);     // get a reference to the id from the url

    book.findById(id, (err, books) => {       // find one book by its id
      if(err) {
        console.log(err);
        res.end(error);
      } else {
        res.render('books/details', {         // show the book details view
            title: 'Book Details',
            books: books,
            
            
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/errors/404');
  }

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id; // get a reference to the id from the url
  let updatedBook = book({
  "_id": id,
  "Title": req.body.title,
  "Price": req.body.price,
  "Author": req.body.author,
  "Genre": req.body.genre

})
 book.updateOne({_id: id}, updatedBook, (err) => {
   if(err) {
     console.log(err);
     res.end(err);
   } else {
     res.redirect('/books'); // refresh the book List
   }
 });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id; // get a reference to the id from the url

    book.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books'); // refresh the books list
      }
    });
});


module.exports = router;
