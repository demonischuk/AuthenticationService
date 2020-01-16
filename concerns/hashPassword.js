const crypto = require('crypto');

module.exports = ((settings) => {
    const hash = (password) => {
        return Promise.resolve(crypto.createHmac('sha256', settings.hashSecret || "salt")
        .update(password)
        .digest('hex'));
    };

    return {
        hash
    };
});