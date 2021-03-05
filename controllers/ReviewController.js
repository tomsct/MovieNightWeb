const Movie = require("../models/MovieModel");
const Review = require("../models/ReviewModel");
const AppError = require("../utils/AppError");
const { reviewSchema } = require("../schemas");

exports.movie_reviews = async (req, res, next) => {
    const movie = await Movie.findOne({"imdbID": req.params.id});
    const review = new Review(req.body.review);
    movie.Reviews.push(review);
    await review.save();
    await movie.save();
    res.send(review);
};

exports.validate_review = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    
    if(error){
        let msg = error.details.map(el => el.message).join(`,`);
        res.status(400).send();
        throw new AppError(msg, 400);
    }
    else 
        next();
}

exports.delete_review = async (req, res, next) => {
    res.send(await Review.findByIdAndDelete(req.params.reviewID));
}
