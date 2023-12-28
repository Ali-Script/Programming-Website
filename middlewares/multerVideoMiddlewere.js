const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, path.join("public", "courses", "sessions", "videos"))

    },
    filename: function (req, file, cb) {
        try {
            const fileunicname = Date.now() + Math.random() * 100
            const extname = path.extname(file.originalname)

            const validFormat = [".mp4", ".mkv"]

            if (validFormat.includes(extname)) {
                cb(null, fileunicname + extname)

            } else {
                cb(new Error(`Just ${validFormat.join(' | ')} is valid`))

            }
        } catch (err) {
            res.send(err)
        }
    }
})

const maxSize = 1 * 1000 * 1000 * 1000

const upload = multer({
    storage, limits: {
        fileSize: maxSize
    }
})

module.exports = upload