const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

module.exports = {
    create: function(req, res, next) {
        const name = sanitize(req.body.name);
        const password = sanitize(req.body.password);

        if (name && password) {
            userModel.findOne({ name }, function(err, user) {
                if (err) {
                    next(err);
                }else if (user) {
                    res.json({message: "Name taken"});
                } else {
                    userModel.create({ name, password }, function (err, result) {
                        if (err) {
                            next(err);
                        } else {
                            res.json({ message: "Account created"});
                        }
                    });
                }
            }); 
        }else{
            res.status(400).json({message: "Please include a name and password"});
        }
    },

    authenticate: function(req, res, next) {
        const name = sanitize(req.body.name);
        const password = sanitize(req.body.password);
        if (name && password)
        {
            userModel.findOne({ name }, function(err, userInfo) {
                if (err) {
                    next(err);
                } else {
                    if(userInfo && bcrypt.compareSync(password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '30h' });
                        res.json({ token });
                    } else {
                        res.status(401).json({message: "Invalid credentials"});
                    }
                }
            }); 
        }else{
            res.status(400).json({message: "Please include a name and password"});
        }   
    }
}