const validator = require('fastest-validator')
const v = new validator()

const schema = {
    body: {
        type: 'string',
        required: true,
    },
    $$strict: true
};

const check = v.compile(schema);
module.exports = check