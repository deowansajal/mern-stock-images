const asyncHandler = require('../middleware/asyncHandler')
const Image = require('../models/Image')

exports.getAllImageController = asyncHandler(async (req, res, next) => {
    const images = await Image.find().select('thumbnailImage')
    res.json({ message: 'get all images', images })
})
