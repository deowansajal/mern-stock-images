const message = {
    required: name => `${name} is required!`,
    string: name => `${name} should be valid string`,
    notValid: name => `${name} is not valid`,
    minMax: ({ name, min, max }) =>
        `${name} should be between ${min} and ${max}  characters`,
}

module.exports = message
