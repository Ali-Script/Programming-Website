const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    href: {
        type: 'string',
        required: true
    }

}, { timestamps: true })

const model = mongoose.model("Categories", schema);
module.exports = model;