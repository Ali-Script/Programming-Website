const express = require('express');
const router = express.Router()
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");
const commentController = require('../../controller/v1/commentController')

router
    .route("/create")
    .post(authMiddleware, commentController.create)
router
    .route("/remove/:id")
    .delete(authMiddleware, isAdmin, commentController.remove)
router
    .route("/accept/:id")
    .put(authMiddleware, isAdmin, commentController.accept)
router
    .route("/reject/:id")
    .put(authMiddleware, isAdmin, commentController.reject)
router
    .route("/answer/:id")
    .post(authMiddleware, isAdmin, commentController.answer)
router
    .route("/getAll")
    .get(authMiddleware, isAdmin, commentController.getAll)

module.exports = router