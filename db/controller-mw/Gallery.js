const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from gallery limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.pictures = result;
        db.query(`select count(*) as count from gallery`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.pictureCount = result[0].count;
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
    db.query(`select * from gallery limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.pictures = result;
        db.query(`select count(*) as count from gallery`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.pictureCount = result[0].count;
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
    if (+req.body.day == NaN) {
      return next("Please enter number!");
    }

    db.query(`insert into gallery set dayOfTaken="${req.body.day}",pictureFilename="${req.file.filename}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added picture successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`select pictureFilename from gallery where id="${req.params.id}"`, (err, result) => {
      try {
        if (err) throw err;

        if (result.length > 0) {
          const { pictureFilename } = result[0];

          db.query(`delete from gallery where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./public/uploads/gallery/${pictureFilename}`, (err) => {
                if (err) return console.log("Error during gallery picture removal!");
                console.log("Removed gallery picture successfully!");
              });

              res.json(`Deleted gallery picture successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Gallery picture doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
