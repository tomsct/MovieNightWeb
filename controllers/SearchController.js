const AppError = require("../utils/AppError")
const axios = require('axios');

const OMDB_KEY = process.env.OMDB_KEY;

exports.movies_search = async (req, res, next) => {
    let { query } = req.params;
    query = query.split(' ').join('%20');
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}&type=movie`)
    res.render("search", {movies: response.data.Search});
}