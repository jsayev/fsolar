const mysql = require("mysql");
const config = require("../config.js");

const db = mysql.createConnection(config);

module.exports = {
  addNew(req, res, next) {
    db.query(`select * from subscribers where email=?`, [req.body.email], (err, result) => {
      try {
        if (err) throw err;
        if (result.length > 0) throw "Email is already subscribed!";

        db.query(`insert into subscribers set email=?`, [req.body.email], (err, result) => {
          if (err) throw err;

          res.json("Subscription success!");
        });
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`delete from subscribers where email=?`, [req.params.email], (err, result) => {
      try {
        if (err) throw err;
        if (result.affectedRows === 0) throw "Incorrect email!";

        res.json("Unsubscription success!");
      } catch (error) {
        next(error);
      }
    });
  },
};
