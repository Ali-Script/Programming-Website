const express = require("express");
const router = express.Router();

const menuController = require('./../../controller/v1/menuController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");


router
    .route("/set")
    .post(authMiddleware, isAdmin, menuController.create)
router
    .route("/getAll")
    .get(authMiddleware, menuController.getAll)
router
    .route("/setsub/:parentID")
    .post(authMiddleware, isAdmin, menuController.setSub)
router
    .route("/remove/:id")
    .delete(authMiddleware, isAdmin, menuController.remove)
router
    .route("/removesub/:id")
    .delete(authMiddleware, isAdmin, menuController.removesub)



module.exports = router;