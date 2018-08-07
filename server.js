/****************/
/*libraries*/
/****************/
const bodyparser = require("body-parser");
const express = require("express");
const passport = require("passport");
const pathfinderUI = require("pathfinder-ui");
/****************/
/*end libraries*/
/****************/

/****************/
/*files and scripts*/
/****************/
const networkingInfo = require("./config/networking");
const models = require("./orm");
const api_router = require("./api");
const check_is_admin = require("./auth/check-is-admin");
const passportJWTSetup = require("./auth/passportJWT");
/****************/
/*end files and scripts*/
/****************/

//express app initializion
const app = express();

/****************/
/*middleware*/
/****************/
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//passport config (somewhat similar to middleware for express)
passportJWTSetup(passport);

//for visualizing routes. Restricted to admin access
app.use(
  "/pathfinder",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => check_is_admin(req, res, next),
  function(req, res, next) {
    pathfinderUI(app);
    next();
  },
  pathfinderUI.router
);

/****************/
/*end middleware*/
/****************/

/****************/
/*routes*/
/****************/

//ORDER MATTERS

//for api routes. Is first so all other routes bring the user to the index.html where react is served
app.use("/api", api_router); //covers "/api"
app.use("/api/", api_router); //covers "/api/" (anything can go after the last forward slash)

//for loading the index page.
//All routes except the routes above will be directed to the index.html page where react is served
app.get("/", (req, res) =>
  res.sendFile("./client/public/index.html", { root: __dirname })
);
/****************/
/*end routes*/
/****************/

/****************/
/*db and server init*/
/****************/
models.sequelize.sync().then(function() {
  app.listen(networkingInfo.port, () => {
    console.log(`App live on port ${networkingInfo.port}`);
  });
});
/****************/
/*end db and server init*/
/****************/
