const express = require("express");

const offController = require('./../../controller/v1/offController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router();

router
    .route("/create")
    .post(authMiddleware, isAdmin, offController.create)
router
    .route("/getAll")
    .get(authMiddleware, isAdmin, offController.getAll)
router
    .route("/setToAll")
    .post(authMiddleware, isAdmin, offController.setToAll)
router
    .route("/use/:code")
    .post(authMiddleware, offController.use)
router
    .route("/remove/:code")
    .delete(authMiddleware, isAdmin, offController.remove)

module.exports = router;