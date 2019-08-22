const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");

module.exports = {
  create: function(req, res, next) {
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);

    if (name && email) {
      userModel.create({ name, email }, function(err, result) {
        if (err) {
          next(err);
        } else {
          res.json({ message: "Account created" });
        }
      });
    } else {
      res.status(400).json({ message: "Please include a name and email" });
    }
  }
};
