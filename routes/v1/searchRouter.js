const express = require("express");

const searchController = require('./../../controller/v1/searchController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router();

router
    .route("/search/:keyword")
    .get(searchController.search)

module.exports = router;