const { validationResult } = require('express-validator')

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return { [param]: msg }
}

const getValidationResult = req => {
    const result = validationResult(req).formatWith(errorFormatter)

    if (!result.isEmpty()) {
        return {
            hasError: true,
            errors: result.mapped({ onlyFirstError: true }),
        }
    }

    return {
        hasError: false,
        errors: [],
    }
}

module.exports = getValidationResult
