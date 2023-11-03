const ShortUrl = require('./shortUrl.js')

async function createShort(full) {
    return await ShortUrl.create({full: full})
}

module.exports = { createShort } 