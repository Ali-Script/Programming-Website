const express = require("express");

const notificationController = require('./../../controller/v1/notificationController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router();

router
    .route("/send")
    .post(authMiddleware, isAdmin, notificationController.send)
router
    .route("/get")
    .get(authMiddleware, isAdmin, notificationController.get)
router
    .route("/getAll")
    .get(authMiddleware, isAdmin, notificationController.getAll)
router
    .route("/remove/:id")
    .delete(authMiddleware, isAdmin, notificationController.remove)

module.exports = router;