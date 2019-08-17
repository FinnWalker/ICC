const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

module.exports = {
    create: function(req, res, next) {
        const name = sanitize(req.body.name);
        const email = sanitize(req.body.email);
        const password = sanitize(req.body.password);
        userModel.create({ name, email, password }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "User added successfully", data: null});
            }
        });
    },

    authenticate: function(req, res, next) {
        //const name = sanitize(req.body.name);
        const email = sanitize(req.body.email);
        const password = sanitize(req.body.password);
        if (email && password)
        {
            userModel.findOne({ email }, function(err, userInfo) {
                if (err) {
                    next(err);
                } else {
                    if(userInfo && bcrypt.compareSync(password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '30h' });
                        res.json({ status:"success", message: "user found!", data: {user:userInfo, token}});
                    } else {
                        res.json({status:"error", message: "Invalid email/password", data:null});
                    }
                }
            }); 
        }else{
            res.status(400).json({status:400, message: "Invalid email/password", data:null});
        }
        
    }
}