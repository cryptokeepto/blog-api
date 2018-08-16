const config = require("../../config/config");
const PREFIX_API = `/api/${config.api.version}`;
const users = require("../controllers/users.controller");

module.exports = function (app) {
    app.route(`${PREFIX_API}/register`)
        .post(users.register)

    app.route(`${PREFIX_API}/login`)
        .post(users.login)

    app.route(`${PREFIX_API}/logout`)
        .post(users.logout)
};

