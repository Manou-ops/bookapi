// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const router = express.Router();

// const secretKey = "monSecretUltraSecurise";

// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ email, password: hashedPassword });
//   await user.save();
//   res.json({ message: "Utilisateur enregistré !" });
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });
//   const validPass = await bcrypt.compare(password, user.password);
//   if (!validPass) return res.status(400).json({ message: "Mot de passe incorrect" });
//   const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });
//   res.json({ token });
// });

// module.exports = router;

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