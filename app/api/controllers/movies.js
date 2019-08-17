const movieModel = require('../models/movies');
const sanitize = require('mongo-sanitize');

module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        const movieId = sanitize(req.params.movieId);
        movieModel.findById(movieId, function(err, movieInfo) {
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Movie found!", data: {movies: movieInfo}});
            }
        });
    },

    getAll: function(req, res, next) {
        let moviesList = [];

        movieModel.find({}, function(err, movies) {
            if (err) {
                next(err);
            } else {
                for (let movie of movies) {
                    moviesList.push({id: movie._id, name: movie.name, released_on:movie.released_on});
                }
                res.json({status:"success", message: "Movies list found!", data: {movies: moviesList}});
            }
        });
    },

    updateById: function(req, res, next) {
        const movieId = sanitize(req.params.movieId);
        const name = sanitize(req.body.name);
        movieModel.findByIdAndUpdate(movieId, {name}, function(err, movieInfo){
            if(err) {
                next(err);
            } else {
                res.json({status:"success", message: "Movie updated successfully!", data:null});
            }
        });
    },

    deleteById: function(req, res, next) {
        const movieId = sanitize(req.params.movieId);
        movieModel.findByIdAndRemove(movieId, function(err, movieInfo){
            if(err) {
                next(err);
            } else {
                res.json({status:"success", message: "Movie deleted successfully!", data:null});
            }
        });
    },

    create: function(req, res, next) {
        const name = sanitize(req.body.name);
        const released_on = sanitize(req.body.released_on);
        movieModel.create({ name: name, released_on: released_on }, function (err, result) {
            if (err) {
                next(err);
            } else {
                res.json({status: "success", message: "Movie added successfully!", data: null});
            }
        });
    }
}