// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const port = 2030;

// // Connexion à MongoDB Atlas

// //mongodb+srv://MANOUP:1234REZA@cluster0.jxw7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongoose.connect("mongodb+srv://MANOUP:1234REZA@cluster0.jxw7p.mongodb.net/todoApp",).then(() => console.log("Connecté à MongoDB"))
//   .catch(err => console.error("Erreur de connexion", err));

// app.use(express.json());

// // Route pour gérer les tâches
// // app.use("/tasks", require("./routes/tasks.route"));

// app.listen(port, () => {
//     console.log(`Serveur démarré sur http://localhost:${port}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 2030;
app.use(express.json());
app.use(cors());



// mongoose.connect("mongodb://localhost:27017/bookdb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

mongoose.connect("mongodb+srv://MANOUP:1234REZA@cluster0.jxw7p.mongodb.net/todoApp",)
  .then(() => console.log(" Connecté à MongoDB"))
  .catch(err => console.error(" Erreur de connexion", err));

const verifyToken = require("./middleware/authMiddleware");

// app.use("/books", require("./routes/bookRoutes"));
app.use("books", require("./routes/bookRoutes"))
app.use("/authors", require("./routes/authorRoutes"));

app.use("/auth", require("./routes/authRoutes"));

app.listen(port, () => {
  console.log(` Serveur démarré sur http://localhost:${port}`);
});