const sendSuccessResponse = ({ res, message, data = {}, code = 200 }) => {
    res.status(code).json({
        message,
        success: true,
        statusCode: code,
        data,
    })
}

module.exports = sendSuccessResponse
