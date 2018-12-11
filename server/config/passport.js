const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const User          = require('../user/user.server.model');
const mysqlCtrl     = require('../../private_modules/mysql');
const mysql         = require('mysql')
const config        = require('./config');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.privateKey;
    passport.use(new JwtStrategy(opts, (jwt_paload, done) => {
        var sql = "SELECT * FROM dnt3_users WHERE id = " + mysql.escape(jwt_paload._id);            

        mysqlCtrl.query(sql, (err, result) => {
            if (err) return done(new Error("uncaught error! try again later"), false); //Return connction error 
            if (!result.length) return done(new Error("User not found"), false); //Return as taken username
            return done(null, result[0]);                
        });
    }));
}