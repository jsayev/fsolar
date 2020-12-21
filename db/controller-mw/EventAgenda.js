const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  selectOne(req, res, next) {
    db.query(`select * from event_agenda`, (err, result) => {
      try {
        if (err) throw err;

        res.locals.agenda = result[0];
        next();
      } catch (error) {
        next(error);
      }
    });
  },

  create(req, res, next) {
    db.query(
      `insert into event_agenda set fileName="${req.file.filename}",uploadDate="${new Date().toLocaleString()}",originalName="${
        req.file.originalname.split(".")[0]
      }"`,
      (err, result) => {
        try {
          if (err) throw err;

          res.json("Event agenda was uploaded successfully!");
        } catch (error) {
          fs.unlink(`./uploads/event-agenda/${req.file.filename}`, (err) => {
            if (err) return console.log(err);
            console.log("File was removed due to error");
          });
          next(error);
        }
      }
    );
  },

  deleteOne(req, res, next) {
    db.query(`select fileName from event_agenda where id="${req.params.id}"`, (err, result) => {
      try {
        if (err) throw err;
        if (result.length > 0) {
          let filename = result[0].fileName;

          db.query(`delete from event_agenda where id="${req.params.id}"`, (err, result) => {
            try {
              if (err) throw err;

              fs.unlink(`./uploads/event-agenda/${filename}`, (err) => {
                if (err) return console.log(err);
                console.log("Event agenda was deleted successfully!");
              });

              res.json("Deleted successfully!");
            } catch (error) {
              next(error);
            }
          });
        } else {
          throw "Event agenda doesn't exist!";
        }
      } catch (error) {
        next(error);
      }
    });
  },

  deleteAll(req, res, next) {
    db.query(`delete from event_agenda`, (err, result) => {
      try {
        if (err) throw err;

        fs.readdir(`./uploads/event-agenda`, (err, files) => {
          try {
            if (err) throw err;

            files.forEach((filename) => {
              if (filename !== ".gitkeep") {
                fs.unlinkSync(`./uploads/event-agenda/${filename}`);
              }
            });

            res.json("Removed all event agendas successfully!");
          } catch (error) {
            if (error.syscall && error.syscall === "scandir") return next("Incorrect event agenda directory!");
            next("Error occured during deleting event agenda files!");
          }
        });
      } catch (error) {
        next(error);
      }
    });
  },
};
