const userModel = require("../models/users");
const sanitize = require("mongo-sanitize");

const path = require("path");
const fs = require("fs");

const moment = require("moment");

module.exports = {
  create: function(req, res, next) {
    const first_name = sanitize(req.body.first_name);
    const email = sanitize(req.body.email);
    const postcode = sanitize(req.body.postcode);
    const marketing = sanitize(req.body.marketing);

    const afghanistan = sanitize(req.body.afghanistan);
    const australia = sanitize(req.body.australia);
    const bangladesh = sanitize(req.body.bangladesh);
    const england = sanitize(req.body.england);
    const india = sanitize(req.body.india);
    const pakistan = sanitize(req.body.pakistan);
    const south_africa = sanitize(req.body.south_africa);
    const sri_lanka = sanitize(req.body.sri_lanka);
    const thailand = sanitize(req.body.thailand);
    const west_indies = sanitize(req.body.west_indies);
    const other = sanitize(req.body.other);


    if (first_name && email) {
      let time = moment().tz(new Date(), "Australia/Sydney");
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
              let first_name = user.first_name;
              if(first_name === undefined) 
                first_name = '_';
              
              let email = user.email;
              if(email === undefined) email = '_';
              let postcode = user.postcode;
              if(postcode === undefined) postcode = '_';
              let timestamp = user.timestamp;
              if(timestamp === undefined) timestamp = '_';
              let afghanistan = user.afghanistan;
              if(afghanistan === undefined) 
                afghanistan = '_';
   
              let australia = user.australia;
              if(australia === undefined) australia = '_';
              let bangladesh = user.bangladesh;
              if(bangladesh === undefined) bangladesh = '_';
              let england = user.england;
              if(england === undefined) england = '_';
              let india = user.india;
              if(india === undefined) india = '_';
              let pakistan = user.pakistan;
              if(pakistan === undefined) pakistan = '_';
              let south_africa = user.south_africa;
              if(south_africa === undefined) south_africa = '_';
              let sri_lanka = user.sri_lanka;
              if(sri_lanka === undefined) sri_lanka = '_';
              let thailand = user.thailand;
              if(thailand === undefined) thailand = '_';
              let west_indies = user.west_indies;
              if(west_indies === undefined) west_indies = '_';
              let other = user.other;
              if(other === undefined) other = '_';
              content +=
                first_name + "," + email + "," + postcode + "," + timestamp + "," + afghanistan + "," + australia + "," + bangladesh + "," + england + "," + india + "," + pakistan + "," + south_africa + "," + sri_lanka + "," + thailand + "," + west_indies + "," + other + "\n";
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
