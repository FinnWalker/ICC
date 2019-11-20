const userModel = require("../models/users");
const sanitize = require("mongo-sanitize");

const path = require("path");
const fs = require("fs");

var moment = require('moment');



module.exports = {
  create: function(req, res, next) {
    const first_name = sanitize(req.body.first_name);
    const email = sanitize(req.body.email);
    const postcode = sanitize(req.body.postcode);
    const marketing = sanitize(req.body.marketing);

    if (first_name && email) {
      let time = moment.tz(new Date(), "Australia/Sydney");
      userModel.create({ first_name, email, postcode, marketing, timestamp: time.format('D/MM/YYYY hh:mm A') }, function(
        err,
        result
      ) {
        if (err) {
          next(err);
        } else {
          res.json({ message: "Account created" });
        }
      });
    } else {
      console.log(req.body);
      res.status(400).json({ message: "Please include a name and email" });
    }
  },
  getData: function(req, res) {
    let content = "First Name,Email,Postcode,Time\n";
    const password = sanitize(req.body.password);
    if (password === "422820") {
      userModel.find({}, function(err, users) {
        if (err) {
          res.status(500).json({ message: "Error finding users" });
          console.log(err);
          console.log("There was an error finding users");
        } else {
          if (users) {
            for (let user of users) {
              content +=
                user.first_name + "," + user.email + "," + user.postcode + "," + user.timestamp + "\n";
            }
            fs.writeFile("icc_users.csv", content, function(err) {
              if (err) throw err;
              const directory = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "icc_users.csv"
              );
              console.log(directory);

              res.set({
                "Content-Disposition": "attachment; filename=icc_users.csv",
                "Content-type": "text/csv"
              });
              res.sendFile(directory);
            });
          }
        }
      });
    }
    else {
      const directory = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "data.html"
      );
      res.sendFile(directory);
    }
  }
};
