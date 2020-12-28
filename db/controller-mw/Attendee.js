const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  getPartition(req, res, next) {
    db.query(`select * from attendees limit 10 offset ${(req.params.page - 1) * 10}`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.attendees = result;
        db.query(`select count(*) as count from attendees`, (err, result) => {
          try {
            if (err) throw err;
            res.locals.attendeeCount = result[0].count;
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
    db.query(`select * from attendees limit 10`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.attendees = result;
        db.query(`select count(*) as count from attendees`, (err, result) => {
          try {
            if (err) throw err;
            res.locals.attendeeCount = result[0].count;
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
    db.query(`insert into attendees set title="${req.body.title}",logoFilename="${req.file.filename}"`, (err, result) => {
      try {
        if (err) throw err;

        res.json("Added attendee successfully!");
      } catch (error) {
        next(error);
      }
    });
  },

  remove(req, res, next) {
    db.query(`select logoFilename from attendees where id="${req.params.id}"`, (err, attendees) => {
      try {
        if (err) throw err;

        if (attendees.length > 0) {
          const { logoFilename } = attendees[0];

          db.query(`delete from attendees where id=${req.params.id}`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./uploads/attendees/${logoFilename}`, (err) => {
                if (err) return console.log("Error during attendee removal!");
                console.log("Removed attendee logo successfully!");
              });

              res.json(`Deleted attendee successfully!`);
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Attendee doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },
};
