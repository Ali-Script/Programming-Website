const validator = require('fastest-validator')
const v = new validator()

const schema = {

    body: {
        type: "string",
        required: true
    },
    course: {
        type: "string",
        required: true
    },
    score: {
        type: "number",
        default: 0,
        required: false
    },
    $$strict: true
}

const check = v.compile(schema);
module.exports = check