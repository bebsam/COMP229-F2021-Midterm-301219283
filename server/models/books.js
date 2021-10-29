//File Name: books.js
//Student Name: Bebin Samuel
//Student ID: 301219283 
//Date:28/10/21

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
