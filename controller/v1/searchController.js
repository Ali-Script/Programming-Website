const mongoose = require('mongoose');
const courseModel = require('./../../models/courseModel');


exports.search = async (req, res) => {
    try {
        const { keyword } = req.params;

        const result = await courseModel.find({ $or: [{ title: keyword }, { keywords: { $regex: ".*" + keyword + ".*" } }] }).lean()

        if (result.length === 0) {
            return res.status(404).json({ message: "No results found" });
        }

        return res.json(result);

    }
    catch (err) { return res.status(422).json({ message: err.message }); }
}
// test 1