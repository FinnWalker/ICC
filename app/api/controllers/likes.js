const userModel = require('../models/users');
const likesModel = require('../models/likes');
const sanitize = require('mongo-sanitize');

module.exports = {
    find: function(req, res, next) {
        userModel.findOne({ _id: req.body.userId }, function(err, user) {
            if(err) {
                next(err);
            }else if (user) {
                res.json({item_ids: user.likes});
            }else{
                res.json({message: "User not found"});
            }
        }); 
    },

    deleteLike: function(req, res, next) {
        const itemId = sanitize(req.params.itemId);
        userModel.findOne({ _id: req.body.userId }, function(err, user) {
            if(err) {
                next(err);
            }else if (user) {
                if(user.likes.includes(itemId)) {
                    user.likes.splice(itemId, 1);
                    user.save(function(err) {
                        if(err) {
                            next(err);
                        }else{
                            res.json({message: "Like removed"});
                        }
                    });
                }else{
                    res.json({message: "Item not found in likes"});
                }
            }else{
                res.json({message: "User not found"});
            }
        });         
    },

    addLike: function(req, res, next) {
        const itemId = sanitize(req.params.itemId);
        userModel.findOne({ _id: req.body.userId }, function(err, user) {
            if(err) {
                next(err);
            }else if (user) {
                likesModel.findOne({ id: itemId}, function(err, item) {
                    if(err) {
                        next(err);
                    }else if (item) {

                        if(user.likes.includes(itemId)) {
                            res.json({message: "Item already liked"});
                        }else{
                            user.likes.push(itemId);
                            user.save(function(err) {
                                if(err) {
                                    next(err);
                                }else{
                                    res.json("Like added");
                                }
                            });
                        }
                    }else{
                        res.status(400).json({message: "Item not found"});
                    }
                });
            }else{
                res.json({message: "User not found"});
            }
        });         
    },
}