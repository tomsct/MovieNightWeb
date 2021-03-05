const express = require("express");
const catchAsync = require("../utils/ErrorHandler")
let router = express.Router();

let movies_controller = require("../controllers/MoviesController");

router.get("/", catchAsync(movies_controller.movies_list));

module.exports = router;