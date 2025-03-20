const express = require("express");
const Book = require("../models/bookModel");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const books = await Book.find().populate("author");
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author");
  res.json(book);
});

router.put("/:id", verifyToken, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Livre supprimé !" });
});

module.exports = router;