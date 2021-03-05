const Movie = require("../models/MovieModel");
const AppError = require("../utils/AppError");

exports.movie_details = async (req, res, next) => {
    const { id } = req.params;
    const exists = await Movie.exists({ imdbID: id });

    if (!exists)
        await Movie.GetAndSaveMovie(id);


    Movie.findOne({ imdbID: id }, (err, movie) => {
        if (err) throw new AppError(err.status, err.message);

        movie = movie.populate("Reviews");
        res.render("show", { movie });
    }).populate("Reviews")
};

