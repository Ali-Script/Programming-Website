const mongoose = require('mongoose');
const usersCourses = require("./../../models/course-userModel");
const courseModel = require("./../../models/courseModel");

exports.create = async (req, res) => {
    try {
        const { CourseId } = req.params;

        const isvalidID = mongoose.Types.ObjectId.isValid(CourseId)
        if (!isvalidID) {
            return res.status(422).json({ message: "Invalid ObjectId !!" })
        }

        const isAlreadyExist = await usersCourses.findOne({ User: req.user._id, Course: CourseId })
        const coursePrice = await courseModel.findOne({ _id: CourseId })

        if (isAlreadyExist) {
            return res.status(422).json({ message: "User already Buy This Course !" })
        }

        const create = await usersCourses.create({
            User: req.user._id,
            Course: CourseId,
            Price: coursePrice.price,
        })

        return res.json(create);
    }
    catch (err) {
        return res.status(422).json(err.message)
    }
}
// test 1