const express = require("express");

const newsletterController = require('./../../controller/v1/newsletterController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router();

router
    .route("/create")
    .post(authMiddleware, newsletterController.create)
router
    .route("/getAll")
    .get(authMiddleware, isAdmin, newsletterController.getAll)



module.exports = router;