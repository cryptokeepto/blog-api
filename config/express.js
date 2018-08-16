const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");


module.exports = function () {
    const app = express();
  
    if (process.env.NODE_ENV === "production") {
      app.use(compression());
    } else {
      app.use(morgan("dev"));
    }
  
    // allow
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    })
  
    // bodyParser
    app.use(bodyParser.json());

  
    // routes
    require("../app/routes/users.route")(app);
    // require("../app/routes/admin.route")(app);
    // require("../app/routes/member.route")(app);
  
    // set static folder
    app.use(express.static("./public"));
  
  
    // request path not exist
    app.use("*", function (req, res) {
      res
        .status(404)
        .json({ error: "404 Page Not Found" });
    });
  
    return app;
  };
  