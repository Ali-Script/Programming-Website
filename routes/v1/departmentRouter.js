const express = require('express');
const router = express.Router();

const departmentController = require('../../controller/v1/departmentController')

const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");

router
    .route("/add")
    .post(authMiddleware, isAdmin, departmentController.add)

router
    .route("/getall")
    .get(authMiddleware, departmentController.getall)
router
    .route("/remove/:id")
    .delete(authMiddleware, isAdmin, departmentController.remove)
router
    .route("/addsub/:parent")
    .post(authMiddleware, isAdmin, departmentController.addsub)
router
    .route("/getsubs")
    .get(authMiddleware, departmentController.getsubs)
router
    .route("/removesub/:id")
    .delete(authMiddleware, isAdmin, departmentController.removesub)

module.exports = router;