class ErrorResponse extends Error {
    constructor({ message, code = 400, error = {} }) {
        super(message)
        this.statusCode = code
        this.error = error
        this.success = false
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorResponse
