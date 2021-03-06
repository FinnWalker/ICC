const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const mongoose = require("./config/database"); // Database configuration

const app = express();
app.use(cors());

app.use('/icc/', express.static('public'));

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

const usersController = require("./app/api/controllers/users.js");

app.post("/icc/users/register", usersController.create);
//app.get('/icc/users/user_data', userController.getData);
app.post("/icc/users/user_data", usersController.getData);
app.get("/icc/users/user_data", (req, res) => {
  res.sendFile(path.join(__dirname, "data.html"));
});

app.listen(6000, () => {
  console.log("Server listening on port 6000");
});
