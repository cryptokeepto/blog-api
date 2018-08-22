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
            "users_firstname": req.body.users_firstname,
            "users_lastname": req.body.users_lastname,
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
    MongoClient.connect(config.mongodb.uri, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;
        const db = client.db(config.mongodb.database);
        db.collection("users")
            .findOne({ "users_email": req.body.users_email, "users_password": req.body.users_password })
            .then(function (user) {
                if (user === null) {
                    // login not success
                    res.status(401).json({ "status": false, "message": "email or password invalid." });
                    return;
                } else {
                    // login success and keep in jwt
                    const header = {
                        "alg": "HS256",
                        "typ": "JWT"
                    }
                    const payload = {
                        "user": {
                            "id": user.users_id,
                            "firstname": user.users_firstname,
                            "lastname": user.users_lastname,
                            "username": user.users_username,
                            "email": user.users_email,
                            "role": user.users_roles
                        }
                    }
                    const signature = jwt.sign(payload, { algorithm: header.alg, expiresIn: 60 * 60 });

                    res.status(200).json({ "status": true, "message": signature });
                    return;
                }
            })
            .catch(function (error) {
                res.status(409).json({ "status": false, "message": `${error}` });
                return;
            })
    });
};

exports.logout = function (req, res) {

};