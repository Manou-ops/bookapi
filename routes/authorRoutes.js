const express = require("express");
const Author = require("../models/authorModel");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

router.get("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.json(author);
});

router.put("/:id", verifyToken, async (req, res) => {
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(author);
});

router.delete("/:id", verifyToken, async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: "Auteur supprimé !" });
});

module.exports = router;