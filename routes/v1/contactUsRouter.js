const express = require("express");

const contactUs = require('./../../controller/v1/contactUsController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router();

router
    .route("/set")
    .post(authMiddleware, contactUs.set)
router
    .route("/all")
    .get(authMiddleware, isAdmin, contactUs.getAll)
router
    .route("/remove/:id")
    .delete(authMiddleware, isAdmin, contactUs.remove)
router
    .route("/answer")
    .post(authMiddleware, isAdmin, contactUs.answer)



module.exports = router;