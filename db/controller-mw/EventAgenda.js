const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const db = mysql.createConnection(config);

module.exports = {
  pickAll(req, res, next) {
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
          fs.unlink(`./public/uploads/eventAgenda/${req.file.filename}`, (err) => {
            if (err) return console.log(err);
            
            console.log("File was removed due to error");
          });
          next(error);
        }
      }
    );
  },

  delete(req, res, next) {
    db.query(`delete from event_agenda`, (err, result) => {
      try {
        if (err) throw err;

        fs.readdir(`./public/uploads/eventAgenda`, (err, fileNames) => {
          if (err) return console.log(err);

          fileNames.forEach((name) => {
            if (name != ".gitkeep") {
              fs.unlink(`./public/uploads/eventAgenda/${name}`, (err) => {
                if (err) console.log(err);
              });
            }
          });
          console.log("Event agenda file was removed successfully!");
        });

        res.json("Deleted successfully!");
      } catch (error) {
        next(error);
      }
    });
  },
};
