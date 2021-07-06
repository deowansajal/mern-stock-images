const commonSchema = (required = true) => {
    return {
        type: String,
        required,
    }
}

module.exports = commonSchema
