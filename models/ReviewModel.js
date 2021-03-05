const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    author: mongoose.Schema.Types.ObjectId,
    body: String,
    rating: Number
})

module.exports = mongoose.model("Review", reviewSchema);