const mysql = require("mysql");
const config = require("../config");
const bcrypt = require("bcrypt");

const db = mysql.createConnection(config);

module.exports = {
  create(req, res, next) {
    if (req.body.username.trim().length === 0 || req.body.password.trim().length === 0) return "Empty fields are not allowed!";
    if (req.body.password !== req.body.repassword) return next(`Passwords don't match!`);

    db.query(`select username from admins where username="${req.body.username}"`, (err, result) => {
      try {
        if (err) throw err;
        if (result.length > 0) throw "Username is already in use!";

        db.query(
          `insert into admins set username="${req.body.username}",password="${bcrypt.hashSync(req.body.password.trim(), 10)}"`,
          (err, result) => {
            try {
              if (err) throw err;
              res.json("Registered successfully!");
            } catch (error) {
              next(error);
            }
          }
        );
      } catch (error) {
        next(error);
      }
    });
  },

  findOne(obj, cb) {
    db.query(`select * from admins where ${obj.username ? "username" : "id"}="${obj.username ? obj.username : obj.id}"`, (err, result) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      cb(null, result[0]);
    });
  },

  updatePassword(req, res, next) {
    if (req.body.password.length === 0) return next("Empty password is not allowed!");
    if (req.body.password !== req.body.repassword) return next(`Passwords don't match!`);

    db.query(`update admins set password="${bcrypt.hashSync(req.body.password, 10)}" where id="${req.user.id}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Changed password successfully!");
      } catch (error) {
        next(error);
      }
    });
  },
};
