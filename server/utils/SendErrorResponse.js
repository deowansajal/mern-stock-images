class SendErrorResponse extends Error {
    constructor({ message, code = 400, data = [] }) {
        super(message)
        this.statusCode = code
        this.data = data
        this.success = false
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = SendErrorResponse
