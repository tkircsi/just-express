const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../db/Users');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = require('./config').jwt_secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      const user = Users.getUser(jwt_payload.username);
      done(null, user);
    })
  );
};
