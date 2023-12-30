const express = require('express')
const router = express.Router()
const courseController = require('../../controller/v1/courseController')
const categoryController = require('../../controller/v1/categoryController')
const usersCoursesController = require('../../controller/v1/Users-CoursesController')
const sessionController = require('../../controller/v1/sessionController')
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdmin = require("./../../middlewares/isAdmin");
const multerMiddleware = require('./../../middlewares/multerPhotoMiddleware')
const multerVideoMiddleware = require('./../../middlewares/multerVideoMiddlewere')

// Courses *

router
    .route("/add")
    .post(authMiddleware, isAdmin, multerMiddleware.single("cover"), courseController.addCourse)
router
    .route("/update/:id")
    .put(authMiddleware, isAdmin, multerMiddleware.single("cover"), courseController.updateCourse)
router
    .route("/remove/:id")
    .delete(authMiddleware, isAdmin, courseController.deleteCourse)
router
    .route("/getAllCourse/:category")
    .get(authMiddleware, courseController.getAllCourse)
router
    .route("/get/:href")
    .get(authMiddleware, courseController.getOne)
router
    .route("/related/:href")
    .get(authMiddleware, courseController.relatedCourse)
router
    .route("/popular")
    .get(authMiddleware, courseController.popular)
router
    .route("/presell")
    .get(authMiddleware, courseController.presell)
router
    .route("/all")
    .get(courseController.getAll)

// Sessions *

router
    .route("/session/add/:courseID")
    .post(authMiddleware, isAdmin, multerVideoMiddleware.single("video"), sessionController.addOne)
router
    .route("/session/get/:href/:id")
    .get(authMiddleware, isAdmin, sessionController.getOne)
router
    .route("/session/getAll")
    .get(authMiddleware, isAdmin, sessionController.getAll)
router
    .route("/session/getAll/:href")
    .get(authMiddleware, isAdmin, sessionController.getAllFC)
router
    .route("/session/remove/:id")
    .delete(authMiddleware, isAdmin, sessionController.deleteOne)

router
    .route("/register/:CourseId")
    .post(authMiddleware, usersCoursesController.create)


module.exports = router; 