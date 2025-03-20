// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//     Titre: { type: String, required: true }, 
//     Auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
//     Année: { type: Number }, 
//     Type: { type: String }
// });

// const Book = mongoose.model('Book', bookSchema);

// module.exports = Book;


const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  year: { type: Number },
  genre: { type: String }
});

module.exports = mongoose.model("Book", bookSchema);