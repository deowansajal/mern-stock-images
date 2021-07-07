const { validationResult } = require('express-validator')

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return { [param]: msg }
}

const getValidationResult = ({ req, imperative = false }) => {
    let result

    if (imperative) {
        return async validations => {
            await Promise.all(
                validations.map(validation => validation.run(req))
            )
            result = validationResult(req).formatWith(errorFormatter)
            if (!result.isEmpty()) {
                return {
                    hasError: true,
                    errors: result.array({ onlyFirstError: true }),
                }
            }

            return {
                hasError: false,
                errors: [],
            }
        }
    }

    result = validationResult(req).formatWith(errorFormatter)

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
