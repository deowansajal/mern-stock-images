const asyncHandler = require('../middleware/asyncHandler')
const Image = require('../models/Image')

exports.getAllImageController = asyncHandler(async (req, res, next) => {
    const images = await Image.find().select('-mainImage -path')
    res.json({ message: 'get all images', images })
})

exports.getImageByIdController = asyncHandler(async (req, res, next) => {
    const image = await Image.find({ _id: req.params.id }).select(
        '-mainImage -path'
    )
    res.json({ message: 'get all image', image })
})
