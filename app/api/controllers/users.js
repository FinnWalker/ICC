const userModel = require("../models/users");
const sanitize = require("mongo-sanitize");

const path = require("path");
const fs = require("fs");

var moment = require('moment');



module.exports = {
  create: function(req, res, next) {
    const first_name = sanitize(req.body.first_name);
    if(typeof first_name === 'undefined') first_name = '_';
    const email = sanitize(req.body.email);
    if(typeof email === 'undefined') email = '_';
    const postcode = sanitize(req.body.postcode);
    if(typeof postcode === 'undefined') postcode = '_';
    const marketing = sanitize(req.body.marketing);

    const afghanistan = sanitize(req.body.afghanistan);
    if(typeof afghanistan === 'undefined') {
      afghanistan = '_';
      console.log(afghanistan + " should be _!");
    } else {
      console.log(afghanistan);
    }
    const australia = sanitize(req.body.australia);
    if(typeof australia === 'undefined') australia = '_';
    const bangladesh = sanitize(req.body.bangladesh);
    if(typeof bangladesh === 'undefined') bangladesh = '_';
    const england = sanitize(req.body.england);
    if(typeof england === 'undefined') england = '_';
    const india = sanitize(req.body.india);
    if(typeof india === 'undefined') india = '_';
    const pakistan = sanitize(req.body.pakistan);
    if(typeof pakistan === 'undefined') pakistan = '_';
    const south_africa = sanitize(req.body.south_africa);
    if(typeof south_africa === 'undefined') south_africa = '_';
    const sri_lanka = sanitize(req.body.sri_lanka);
    if(typeof sri_lanka === 'undefined') sri_lanka = '_';
    const thailand = sanitize(req.body.thailand);
    if(typeof thailand === 'undefined') thailand = '_';
    const west_indies = sanitize(req.body.west_indies);
    if(typeof west_indies === 'undefined') west_indies = '_';
    const other = sanitize(req.body.other);
    if(typeof other === 'undefined') other = '_';

    if (first_name && email) {
      let time = moment.tz(new Date(), "Australia/Sydney");
      userModel.create({ first_name, email, postcode, marketing, timestamp: time.format('D/MM/YYYY hh:mm A'), afghanistan,australia,bangladesh,england,india,pakistan,south_africa,sri_lanka,thailand,west_indies,other }, function(
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
    let content = "First Name,Email,Postcode,Time,afghanistan,australia,bangladesh,england,india,pakistan,south_africa,sri_lanka,thailand,west_indies,other\n";
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
                user.first_name + "," + user.email + "," + user.postcode + "," + user.timestamp + "," + user.afghanistan + "," + user.australia + "," + user.bangladesh + "," + user.england + "," + user.india + "," + user.pakistan + "," + user.south_africa + "," + user.sri_lanka + "," + user.thailand + "," + user.west_indies + "," + user.other + "\n";
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
