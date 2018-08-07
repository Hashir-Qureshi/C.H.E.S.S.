const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const key = require("../config/keys").jwt_secret;
const UserModel = require("../orm").db.user;
const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      UserModel.findById(jwt_payload.id)
        .then(user => {
          if (user) return done(null, user);
          else return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
