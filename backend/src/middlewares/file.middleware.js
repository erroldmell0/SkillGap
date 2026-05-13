const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 3 //3 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "resume"));
        }

        cb(null, true);
    }
})

module.exports = upload
