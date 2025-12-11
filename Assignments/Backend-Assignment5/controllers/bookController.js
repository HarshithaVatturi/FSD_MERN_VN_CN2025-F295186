const Book = require("../models/book");

// CREATE a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ message: "Book added", data: newBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all books (with optional ?genre= and sorting by year)
exports.getAllBooks = async (req, res) => {
  try {
    const { genre } = req.query;
    let filter = {};

    if (genre) {
      filter.genre = genre;
    }

    const books = await Book.find(filter).sort({ publishedYear: 1 });

    res.json({ count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// UPDATE a book by ID
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book updated", data: updatedBook });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// DELETE a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const removed = await Book.findByIdAndDelete(req.params.id);
    if (!removed) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
};
