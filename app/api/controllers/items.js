const likesModel = require('../models/likes');


module.exports = {
    find: function(req, res, next) {
        likesModel.find({}, function(err, items) {
            if(err) {
                next(err);
            }else if (items) {
                res.json({items});
            }else{
                res.json({message: "Items not found"});
            }
        }); 
    },
}