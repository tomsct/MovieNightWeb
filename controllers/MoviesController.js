const Movie = require("../models/MovieModel");
const AppError = require("../utils/AppError")

exports.movies_list = async (req, res, next) => {
    Movie.find({}, (err, movies) => {
        if (err) throw new AppError(err.message, err.status);

        res.render("movies", { movies });
    })
};