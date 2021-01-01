const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(
      `SELECT s.id,s.title,s.logoFilename,stype.id AS typeid,stype.name AS typename from sponsors AS s inner join sponsor_type as stype on s.typeID=stype.id limit 10 offset ${
        (req.params.page - 1) * 10
      }`,
      (err, result) => {
        try {
          if (err) throw err;

          res.locals.sponsors = result;
          db.query(`select count(*) as count from sponsors`, (err, result) => {
            try {
              if (err) throw err;

              res.locals.sponsorCount = result[0].count;
              db.query(`select * from sponsor_type`, (err, result) => {
                try {
                  if (err) throw err;

                  res.locals.types = result;
                  next();
                } catch (error) {
                  next(error);
                }
              });
            } catch (error) {
              next(error);
            }
          });
        } catch (error) {
          next(error);
        }
      }
    );
  },

  getInitial(req, res, next) {
    db.query(
      `SELECT s.id,s.title,s.logoFilename,stype.id AS typeid,stype.name AS typename from sponsors AS s inner join sponsor_type as stype on s.typeID=stype.id limit 10`,
      (err, result) => {
        try {
          if (err) throw err;

          res.locals.sponsors = result;
          db.query(`select count(*) as count from sponsors`, (err, result) => {
            try {
              if (err) throw err;

              res.locals.sponsorCount = result[0].count;
              db.query(`select * from sponsor_type`, (err, result) => {
                try {
                  if (err) throw err;

                  res.locals.types = result;
                  next();
                } catch (error) {
                  next(error);
                }
              });
            } catch (error) {
              next(error);
            }
          });
        } catch (error) {
          next(error);
        }
      }
    );
  },

  addNew(req, res, next) {
    db.query(`insert into sponsors set title="${req.body.title}",typeID=${req.body.type},logoFilename="${req.file.filename}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added support organization successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`select logoFilename from sponsors where id="${req.params.id}"`, (err, sponsors) => {
      try {
        if (err) throw err;

        if (sponsors.length > 0) {
          const { logoFilename } = sponsors[0];

          db.query(`delete from sponsors where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./public/uploads/sponsors/${logoFilename}`, (err) => {
                if (err) return console.log("Error during sponsor logo removal!");
                console.log("Removed sponsor logo successfully!");
              });

              res.json(`Deleted sponsor successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Sponsor doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
