const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "menu",

    },
}, { timestamps: true });

const menu = mongoose.model("menu", schema)

module.exports = menu;

