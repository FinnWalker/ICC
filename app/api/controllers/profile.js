const userModel = require('../models/users');

module.exports = {
    getProfile: function(req, res, next) {
        userModel.findOne({ _id: req.body.userId }, function(err, user) {
            if(err) {
                next(err);
            }else if (user) {
                res.json({name: user.name});
            }else{
                res.json({message: "User not found"});
            }
        }); 
    }
}