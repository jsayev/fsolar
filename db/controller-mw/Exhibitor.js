const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from exhibitors limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.exhibitors = result;
        db.query(`select count(*) as count from exhibitors`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.exhibitorCount = result[0].count;
            next();
          } catch (error) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    });
  },

  getInitial(req, res, next) {
    db.query(`select * from exhibitors limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.exhibitors = result;
        db.query(`select count(*) as count from exhibitors`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.exhibitorCount = result[0].count;
            next();
          } catch (error) {
            next(error);
          }
        });
      } catch (error) {
        next(error);
      }
    });
  },

  addNew(req, res, next) {
    db.query(`insert into exhibitors set title="${req.body.title}",logoFilename="${req.file.filename}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added exhibitor successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`select logoFilename from exhibitors where id="${req.params.id}"`, (err, exhibitors) => {
      try {
        if (err) throw err;

        if (exhibitors.length > 0) {
          const { logoFilename } = exhibitors[0];

          db.query(`delete from exhibitors where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./public/uploads/exhibitors/${logoFilename}`, (err) => {
                if (err) return console.log("Error during exhibitor logo removal!");
                console.log("Removed exhibitor logo successfully!");
              });

              res.json(`Deleted exhibitor successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Exhibitor doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
