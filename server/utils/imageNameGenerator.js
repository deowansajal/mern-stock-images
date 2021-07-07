const path = require('path')

const imageNameGenerator = file => {
    return (
        path.basename(
            file.fieldname + '-' + file.originalname,
            path.extname(file.originalname)
        ) +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    )
}

module.exports = imageNameGenerator
