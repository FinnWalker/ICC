const userModel = require("../models/users");
const sanitize = require("mongo-sanitize");

const fs = require('fs');

module.exports = {
  create: function(req, res, next) {
    const first_name = sanitize(req.body.first_name);
    const email = sanitize(req.body.email);
    const postcode = sanitize(req.body.postcode);
    const marketing = sanitize(req.body.marketing);

    if (first_name && email) {
      userModel.create({ first_name, email, postcode, marketing }, function(err, result) {
        if (err) {
          next(err);
        } else {
          res.json({ message: "Account created" });
        }
      });
    } else {
      console.log(req.body)
      res.status(400).json({ message: "Please include a name and email" });
    }
  },
  getData: function(req, res, next) {
    let content = "First Name,Email,Postcode\n";

    userModel.find({}, function(err, users) {
      if (err) {
        res.status(500).json({message: "Error finding users"})
        console.log(err);
        console.log("There was an error finding users");
      } else {
        if (users) {
          for (let users of users) {
            content += participant.first_name + ',' + participant.email + ',' + participant.postcode + '\n';
          }
          fs.writeFile('icc_users.csv', content, function (err) {
            if (err) throw err;
            res.sendFile('icc_users.csv');
          });
        }
      }
    });

  }
};
