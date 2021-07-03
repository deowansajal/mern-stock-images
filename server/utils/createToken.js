const crypto = require('crypto')
const createToken = ({ sha = 'sha256', token, digest = 'hex' }) =>
    crypto.createHash(sha).update(token).digest(digest)

module.exports = createToken
