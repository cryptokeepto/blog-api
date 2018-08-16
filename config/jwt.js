const config = require("./config");
const jwt = require("jsonwebtoken");

module.exports = {
    sign: function(payload, options) {
        return jwt.sign(payload, config.tokenSecret, options);
    },
    verify: function(token, callback) {
        return jwt.verify(token, config.tokenSecret, callback);
    }
}


