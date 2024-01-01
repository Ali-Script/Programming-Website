const express = require('express');
const router = express.Router();

const ticketController = require('./../../controller/v1/ticketController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");


router
    .route("/create")
    .post(authMiddleware, isAdmin, ticketController.create);
router
    .route("/getAll")
    .get(authMiddleware, isAdmin, ticketController.getAll);
router
    .route("/myTickets")
    .get(authMiddleware, ticketController.myTicket);
// router
//     .route("/departments/get")
//     .get(authMiddleware, ticketController.department);
// router
//     .route("/departments/:id/Sub")
//     .get(authMiddleware, ticketController.departmentSub);
router
    .route("/answer")
    .post(authMiddleware, isAdmin, ticketController.answer);
router
    .route("/:id/answer")
    .get(authMiddleware, ticketController.getAnswer);
router
    .route("/remove/:id")
    .delete(authMiddleware, ticketController.remove);
router
    .route("/removeAnswer/:id")
    .delete(authMiddleware, ticketController.removeAnswer);

module.exports = router;