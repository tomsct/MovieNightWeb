const express = require("express");
const catchAsync = require("../utils/ErrorHandler")
let router = express.Router();

let search_controller = require("../controllers/SearchController");

router.get("/:query", catchAsync(search_controller.movies_search));

module.exports = router;