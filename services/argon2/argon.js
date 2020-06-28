const argon = require('argon2')

async function hash(str) {
    return await argon.hash(str, {
        type: argon.argon2id
    })
}

async function verify(hash, str) {
    if (await argon.verify(hash, str)) {
        return true
    }
    return false
}

module.exports = {
    hash,
    verify
}