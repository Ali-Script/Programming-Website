const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "department",
        required: true
    },
}, { timestamps: true });

const departmentS = mongoose.model("departmentSub", schema)

module.exports = departmentS;

