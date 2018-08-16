const config = require("../../config/config");
const MongoClient = require("mongodb").MongoClient;
const jwt = require("../../config/jwt");
const time = require("../../public/js/time");

exports.register = function (req, res) {
    MongoClient.connect(config.mongodb.uri, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        const db = client.db(config.mongodb.database);
        let myObj = {
            "users_id": "UID" + Date.now(),
            "users_firstName": req.body.users_firstName,
            "users_lastName": req.body.users_lastName,
            "users_username": req.body.users_username,
            "users_password": req.body.users_password,
            "users_email": req.body.users_email,
            "users_roles": "member",
            "users_created": time.now(),
            "users_updated": "-",
        }

        db.collection("users").insertOne(myObj, (err, data) => {
            if (err) throw err;
            if (data.result.n === 1) {
                res.status(201).json({ "status": true, "message": `Signup is success.` });
            } else {
                res.status(409).json({ "status": false, "message": `${error}` });
            }
        });
        client.close();
    });
};

exports.login = function (req, res) {

};

exports.logout = function (req, res) {

};