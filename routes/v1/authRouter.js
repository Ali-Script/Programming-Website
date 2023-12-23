const express = require('express')
const router = express.Router()
const authcontroller = require('../../controller/v1/authController')
const authMiddleware = require('../../middlewares/authMiddleware')

router
    .route("/register")
    .post(authcontroller.register)

router
    .route("/login")
    .post(authcontroller.login)

router
    .route("/getme")
    .get(authMiddleware, authcontroller.getme)

module.exports = router;