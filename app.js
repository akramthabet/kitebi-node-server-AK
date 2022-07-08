require("dotenv").config();

// dependencies
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// variables
const app = express();
const port = process.env.PORT || 5000

// database
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (err) => {
      console.log("Database connection error", err);
    }
  );

// middlewares
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/audiobooks", express.static("uploads/audiobooks"));
app.use("/books", express.static("uploads/books"));
app.use("/users", express.static("uploads/users"));

// routes
app.use("/", require("./routes/web-route"))
app.use("/user", require("./routes/user-route"))
app.use("/auth", require("./routes/auth-route"))
app.use("/book", require("./routes/book-route"))
app.use("/audiobook", require("./routes/audiobook-route"))

// server run
app.listen(port, () => console.log("Server up and running on port " + port))