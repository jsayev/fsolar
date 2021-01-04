const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from virtual_conferences limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.virtualConferences = result;
        db.query(`select count(*) as count from virtual_conferences`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.virtualConferenceCount = result[0].count;
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
    db.query(`select * from virtual_conferences limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.virtualConferences = result;
        db.query(`select count(*) as count from virtual_conferences`, (err, result) => {
          try {
            if (err) throw err;

            res.locals.virtualConferenceCount = result[0].count;
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

  getOne(req, res, next) {
    db.query(`select * from virtual_conferences as v where v.id=${req.params.id}`, (err, result) => {
      try {
        if (err) throw err;

        res.json(result[0]);
      } catch (error) {
        next(error);
      }
    });
  },

  addNew(req, res, next) {
    db.query(
      `insert into virtual_conferences set title="${req.body.title}",pictureFilename="${req.file.filename}",description="${req.body.description}",date="${req.body.date}",time="${req.body.time}"`,
      (err, result) => {
        try {
          if (err) throw err;

          res.json("Added Virtual Conference successfully!");
        } catch (error) {
          next(error);
        }
      }
    );
  },

  remove(req, res, next) {
    db.query(`select pictureFilename from virtual_conferences where id="${req.params.id}"`, (err, virtual_conferences) => {
      try {
        if (err) throw err;

        if (virtual_conferences.length > 0) {
          const { pictureFilename } = virtual_conferences[0];

          db.query(`delete from virtual_conferences where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./public/uploads/virtualConference/${pictureFilename}`, (err) => {
                if (err) return console.log("Error during virtual conference picture removal!");
                console.log("Virtual conference picture was removed successfully!");
              });

              res.json(`Deleted virtual conference successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Virtual Conference doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
