const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Admin = require("../db/controller-mw/Admin");

module.exports.initialize = (passport) => {
  passport.use(
    new Strategy(function (username, password, done) {
      Admin.findOne({ username }, function (err, admin) {
        if (err) {
          return done(err);
        }
        if (!admin) {
          return done(null, false, { message: "User doesn't exist!" });
        }
        if (!bcrypt.compareSync(password, admin.password)) {
          return done(null, false, { message: "Incorrect password!" });
        }
        return done(null, admin);
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Admin.findOne({ id }, function (err, admin) {
      if (err) {
        return done(err);
      }
      return done(null, admin);
    });
  });
};

module.exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    try {
      if (err) throw err;
      if (info) throw info.message;

      if (user) {
        req.logIn(user, (err) => {
          if (err) throw err;

          res.json("Logging in ...");
        });
      }
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/dashboard/login");
};
