const mongoose = require("mongoose");
const axios = require('axios');
const AppError = require("../utils/AppError")
require("dotenv").config();

const OMDBKey = process.env.OMDBKey;
const YoutubeKey = process.env.YoutubeKey;

const movieSchema = new mongoose.Schema({
    Title: {
        type: String,
        require: true
    },
    Year: Number,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [
        {
            _id: { id: false },
            Source: String,
            Value: String
        }
    ],
    Metascore: String,
    imdbRating: String,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    Production: String,
    TrailerID: String,
    Reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

movieSchema.statics.GetAndSaveMovie = async (id) => {
    let movie = await axios.get(`http://www.omdbapi.com/?apikey=${OMDBKey}&i=${id}`);
    if (movie.data.Response === "False") throw new AppError(movie.data.Error, 400);

    movie = new mongoose.model("Movie", movieSchema)(movie.data);
    
    movie.TrailerID = await GetTrailer(movie);
    await movie.save();
}

async function GetTrailer(movie) {
    let trailerQuery = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${movie.Title.replace(/ /g, "%20")}%20${movie.Year.toString()}%20Trailer&type=video&key=${YoutubeKey}`
    let response = await axios.get(trailerQuery);

    if (response.status != 200) throw new AppError(response.statusText, response.status);

    return response.data.items[0].id.videoId;
}

module.exports = mongoose.model("Movie", movieSchema);



