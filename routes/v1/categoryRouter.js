const express = require("express");
const categoryController = require("./../../controller/v1/categoryController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router()

router
    .route("/set")
    .post(authMiddleware, isAdmin, categoryController.setCategory)
router
    .route("/getOne/:id")
    .get(categoryController.getOne)
router
    .route("/getAll")
    .get(categoryController.getAll)
router
    .route("/removeOne/:id")
    .delete(authMiddleware, isAdmin, categoryController.removeOne)

module.exports = router;