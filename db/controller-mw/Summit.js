const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  selectOne(req, res, next) {
    db.query(`select * from summits`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.summit = result[0];
        next();
      } catch (error) {
        next(error);
      }
    });
  },

  create(req, res, next) {
    // console.log(req.body);
    return res.json(req.body);
    db.query(
      `insert into summits set title="${req.body.title}",date="${req.body.date}",edition="${req.body.edition}",location="${req.body.location}",about="${req.body.about}",videoLink="${req.body.videoLink}"`,
      (err, result) => {
        try {
          if (err) throw err;

          //   console.log(result);
          res.json(result);
        } catch (error) {
          next(error);
        }
      }
    );
  },

  deleteOne(req, res, next) {
    db.query(`delete from summits where id=${req.params.id}`, (err, result) => {
      try {
        if (err) throw err;

        if (result.length > 0) {
          // query summit files
        } else {
          throw "Summit doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
