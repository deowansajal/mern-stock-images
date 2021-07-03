const crypto = require('crypto')

const createRandomString = size => crypto.randomBytes(size).toString('hex')

module.exports = createRandomString
