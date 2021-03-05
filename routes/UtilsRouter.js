const express = require("express");
const catchAsync = require("../utils/ErrorHandler")
let router = express.Router();

let utils_controller = require("../controllers/UtilsController");

router.post("/", catchAsync(utils_controller.get_torrents));

module.exports = router;