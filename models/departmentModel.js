const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
}, { timestamps: true });

const department = mongoose.model("department", schema)

module.exports = department;

