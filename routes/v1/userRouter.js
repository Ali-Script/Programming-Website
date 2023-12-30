const express = require("express");
const userController = require("./../../controller/v1/userController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

const router = express.Router()

router
    .route('/banUser/:id')
    .put(authMiddleware, isAdmin, userController.banUser)
router
    .route('/getAll')
    .get(authMiddleware, isAdmin, userController.getAll)
router
    .route('/remove/:id')
    .delete(authMiddleware, isAdmin, userController.removeOneUser)
router
    .route('/makeAdmin/:id')
    .put(authMiddleware, isAdmin, userController.makeAdmin)
router
    .route('/humiliationToUser/:id')
    .put(authMiddleware, isAdmin, userController.humiliationToUser)
router
    .route('/changeInfo')
    .put(authMiddleware, userController.changeInfo)

module.exports = router